import json
import time
import random
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import asyncio
from channels.layers import get_channel_layer

class GameConsumer(AsyncWebsocketConsumer):
    channel_layer = get_channel_layer()
    room_group_name = 'game'
    queue = []
    game_stop = False
    game_width = 800
    game_height = 500
    right_paddleY = 0
    left_paddleY = 0
    ballx = 400
    bally = 250
    balldirectionX = 1
    balldirectionY = 1
    racketHeight = (game_height * 20 / 100)
    racketWidth = (game_width * 2.5 / 100)
    baddle_speed = 10
    ball_radius = 15
    right_score = 0
    left_score = 0
    bonus = 0
    ball_speed = 800 / (4 * 60) + bonus

    player_id = 0
    async def connect(self):
        await self.accept()

        if GameConsumer.player_id < 2:
            
            await GameConsumer.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            GameConsumer.player_id += 1
            print(f'Player {self.player_id} connected')
    
            await self.send(text_data=json.dumps({
                'type': 'player_id',
                'player_id': self.player_id
            }))

            print(f'client {self.player_id} was added to group')
            if self.player_id == 2:
                print('Game started')
                GameConsumer.game_stop = True
                await GameConsumer.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_message',
                        'message': 'Game started'
                    }
                )
                asyncio.create_task(self.run_60_times_per_second())
        else:
            await self.close()
        
    async def disconnect(self, close_code):
        print('Client disconnected')
        
        await GameConsumer.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_message',
                'message': {
                    'message': 'Game stopped',
                    'loser': self.player_id
                }
            }
        )
        
        if self.player_id in self.queue:
            GameConsumer.queue.remove(self.player_id)
            GameConsumer.game_stop = False

        await GameConsumer.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        print('Received:', text_data)
        if not text_data.strip():
            print('Received empty message')
            return
        
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            print('Received malformed JSON')
            return

        action = data.get('action')
        value = data.get('value', 0)

        if action == 'ArrowDown':
            if GameConsumer.right_paddleY <= GameConsumer.game_height - GameConsumer.racketHeight - 10:
                GameConsumer.right_paddleY += value
                print(f'right_paddleY set to: {GameConsumer.right_paddleY}')
        elif action == 'ArrowUp':
            if GameConsumer.right_paddleY >= 10:
                GameConsumer.right_paddleY -= value
                print(f'right_paddleY set to: {GameConsumer.right_paddleY}')

        if action == 's':
            if GameConsumer.left_paddleY <= GameConsumer.game_height - GameConsumer.racketHeight - 10:
                GameConsumer.left_paddleY += value
                print(f'left_paddleY set to: {GameConsumer.left_paddleY}')
        elif action == 'w':
            if GameConsumer.left_paddleY >= 10:
                GameConsumer.left_paddleY -= value
                print(f'left_paddleY set to: {GameConsumer.left_paddleY}')

    @classmethod
    async def pack_data_to_send(self):
        data = {
            'ballx': GameConsumer.ballx,
            'bally': GameConsumer.bally,
            'right_paddleY': GameConsumer.right_paddleY,
            'left_paddleY': GameConsumer.left_paddleY,
            'right_score': GameConsumer.right_score,
            'left_score': GameConsumer.left_score,
            'game_width': GameConsumer.game_width,
            'game_height': GameConsumer.game_height,
            # 'racketHeight': GameConsumer.racketHeight,
            # 'racketWidth': GameConsumer.racketWidth,
        }
        
        await GameConsumer.channel_layer.group_send(
            GameConsumer.room_group_name,
            {
                'type': 'game_data',
                'message': data
            }
        )
        # print('Data sent', data)
    
    async def game_data(self, event):
        data = event['message']
        await self.send(text_data=json.dumps(data))

    async def game_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def run_60_times_per_second(self):
        print('game started', GameConsumer.game_stop)
        while GameConsumer.game_stop:
            await self.gamelogic()
            await asyncio.sleep(1/60)
    
    @classmethod
    async def gamelogic(self):
        # print('game logic')
        GameConsumer.ballx += (GameConsumer.ball_speed + GameConsumer.bonus) * GameConsumer.balldirectionX
        GameConsumer.bally += (GameConsumer.ball_speed + GameConsumer.bonus) * GameConsumer.balldirectionY

        # right paddle
        if GameConsumer.right_paddleY <= GameConsumer.bally <= GameConsumer.right_paddleY + GameConsumer.racketHeight and GameConsumer.ballx + 15 >= GameConsumer.game_width - GameConsumer.racketWidth:
            offset = GameConsumer.bally - (GameConsumer.right_paddleY + GameConsumer.racketHeight / 2)
            offset /= (GameConsumer.racketHeight / 2)
            GameConsumer.ballx = GameConsumer.game_width - GameConsumer.racketWidth - 16
            GameConsumer.balldirectionX *= -1
            GameConsumer.balldirectionY = offset
            GameConsumer.bonus = min(2, GameConsumer.bonus + 1)
        
        # left paddle
        elif GameConsumer.left_paddleY <= GameConsumer.bally <= GameConsumer.left_paddleY + GameConsumer.racketHeight and GameConsumer.ballx - 15 <= GameConsumer.racketWidth:
            offset = GameConsumer.bally - (GameConsumer.left_paddleY + GameConsumer.racketHeight / 2)
            offset /= (GameConsumer.racketHeight / 2)
            GameConsumer.ballx = GameConsumer.racketWidth + 16
            GameConsumer.balldirectionX *= -1
            GameConsumer.balldirectionY = offset
            GameConsumer.bonus = min(2, GameConsumer.bonus + 1)
        
        # ball hits the top wall
        elif GameConsumer.bally - 15 <= 0:
            GameConsumer.bally = 16
            GameConsumer.balldirectionY *= -1
        
        # ball hits the bottom wall
        elif GameConsumer.bally + 15 >= GameConsumer.game_height:
            GameConsumer.bally = GameConsumer.game_height - 16
            GameConsumer.balldirectionY *= -1
        
        # ball hits the left wall (right player scores)
        elif GameConsumer.ballx <= 15:
            print(f'ballx=[{GameConsumer.ballx}] bally=[{GameConsumer.bally}] left_paddleY_start=[{GameConsumer.left_paddleY}] left_paddleY_end[{GameConsumer.left_paddleY + GameConsumer.racketHeight}]')
            GameConsumer.ballx = 250
            GameConsumer.bally = 400
            GameConsumer.balldirectionX = -1  
            GameConsumer.balldirectionY = random.uniform(-1, 1)
            GameConsumer.right_score += 1

        # ball hits the right wall (left player scores)
        elif GameConsumer.ballx >= GameConsumer.game_width - 15:
            print(f'ballx=[{GameConsumer.ballx}] bally=[{GameConsumer.bally}] right_paddleY_start=[{GameConsumer.right_paddleY}] right_paddleY_end[{GameConsumer.right_paddleY + GameConsumer.racketHeight}]')
            GameConsumer.ballx = 250
            GameConsumer.bally = 400
            GameConsumer.balldirectionX = 1
            GameConsumer.balldirectionY = random.uniform(-1, 1)
            GameConsumer.left_score += 1
        await GameConsumer.pack_data_to_send()
