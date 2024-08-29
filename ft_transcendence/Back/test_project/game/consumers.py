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
    game_loop = False
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
    heartbeat = 5
    pause = False
    pause_value = 0
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    async def connect(self):
        await self.accept()

        if GameConsumer.player_id < 2:
            
            await GameConsumer.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            GameConsumer.player_id += 1
            self.player_id = GameConsumer.player_id
            print(f'Player {self.player_id} connected')
    
            await self.send(text_data=json.dumps({
                'type': 'player_id',
                'player_id': self.player_id
            }))

            asyncio.create_task(self.monitor_heartbeat())
            print(f'client {self.player_id} was added to group')
            if self.player_id == 2:
                print('Game started')
                GameConsumer.game_loop = True
                await GameConsumer.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_message',
                        'message': 'Game started'
                    }
                )
                asyncio.create_task(GameConsumer.run_60_times_per_second())
                asyncio.create_task(GameConsumer.pack_data_to_send())
                # asyncio.create_task(GameConsumer.monitor_pause())
        else:
            await self.close()
        
    @classmethod
    async def monitor_pause(self):
        while True:
            while GameConsumer.pause == True and GameConsumer.pause_value > 0:
                GameConsumer.pause_value -= 1
                await asyncio.sleep(1)
            await GameConsumer.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_message',
                    'resumed': 'Game resumed'
                }
            )

    async def monitor_heartbeat(self):
        while self.heartbeat > 0:
            if (GameConsumer.pause == False):
                print(f'decreasing heartbeat {self.heartbeat}')
                self.heartbeat -= 1
            await asyncio.sleep(1)
        print('Client disconnected')
        GameConsumer.player_id -= 1
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
        self.close()
        print('u told them that the game stopped')
        GameConsumer.game_loop = False
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        GameConsumer.channel_layer.group_send(
            GameConsumer.room_group_name,
            {
                'type': 'game_message',
                'message': 'You Win'
            }
        )

    async def receive(self, text_data):
        # print('Received:', text_data)
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

        if action == 'state':
            self.heartbeat = value
            # print('connection is ok with the client')
        elif action == 'pause':
            if GameConsumer.pause == True:
                GameConsumer.pause = False
            else:
                GameConsumer.pause = True
                GameConsumer.pause_value = value

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
        while   GameConsumer.game_loop:
            data = {
                'ballx': GameConsumer.ballx,
                'bally': GameConsumer.bally,
                'right_paddleY': GameConsumer.right_paddleY,
                'left_paddleY': GameConsumer.left_paddleY,
                'right_score': GameConsumer.right_score,
                'left_score': GameConsumer.left_score,
                'game_width': GameConsumer.game_width,
                'game_height': GameConsumer.game_height,
                'ball_radius': 15,
            }
            
            await GameConsumer.channel_layer.group_send(
                GameConsumer.room_group_name,
                {
                    'type': 'game_data',
                    'message': data
                }
            )
            # print('Data sent', data)
            await asyncio.sleep(1/60)
    
    async def game_data(self, event):
        data = event['message']
        await self.send(text_data=json.dumps(data))

    async def game_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    @classmethod
    async def run_60_times_per_second(self):
        print('game started', GameConsumer.game_loop)
        while GameConsumer.game_loop:
            if (GameConsumer.pause == False):
                await GameConsumer.gamelogic()
            await asyncio.sleep(1/60)
    
    @classmethod
    async def gamelogic(self):
        # print('game logic')
        GameConsumer.ballx += (GameConsumer.ball_speed + GameConsumer.bonus) * GameConsumer.balldirectionX
        GameConsumer.bally += (GameConsumer.ball_speed + GameConsumer.bonus) * GameConsumer.balldirectionY

        # right paddle
        if (GameConsumer.ballx + 15 >= GameConsumer.game_width - GameConsumer.racketWidth and
            GameConsumer.right_paddleY <= (GameConsumer.bally + 15) and
            GameConsumer.right_paddleY + GameConsumer.racketHeight >= (GameConsumer.bally - 15)):

            offset = (GameConsumer.bally - (GameConsumer.right_paddleY + GameConsumer.racketHeight / 2)) / (GameConsumer.racketHeight / 2)
            GameConsumer.ballx = GameConsumer.game_width - GameConsumer.racketWidth - 16
            GameConsumer.balldirectionX *= -1
            GameConsumer.balldirectionY = offset
            GameConsumer.bonus = min(2, GameConsumer.bonus + 1)

        # left paddle
        elif (GameConsumer.ballx - 15 <= GameConsumer.racketWidth and
            GameConsumer.left_paddleY <= (GameConsumer.bally + 15) and
            GameConsumer.left_paddleY + GameConsumer.racketHeight >= (GameConsumer.bally - 15)):

            offset = (GameConsumer.bally - (GameConsumer.left_paddleY + GameConsumer.racketHeight / 2)) / (GameConsumer.racketHeight / 2)
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
            GameConsumer.ballx = 400
            GameConsumer.bally = 250
            GameConsumer.balldirectionX = -1  
            GameConsumer.balldirectionY = random.uniform(-1, 1)
            GameConsumer.right_score += 1

        # ball hits the right wall (left player scores)
        elif GameConsumer.ballx >= GameConsumer.game_width - 15:
            print(f'ballx=[{GameConsumer.ballx}] bally=[{GameConsumer.bally}] right_paddleY_start=[{GameConsumer.right_paddleY}] right_paddleY_end[{GameConsumer.right_paddleY + GameConsumer.racketHeight}]')
            GameConsumer.ballx = 400
            GameConsumer.bally = 250
            GameConsumer.balldirectionX = 1
            GameConsumer.balldirectionY = random.uniform(-1, 1)
            GameConsumer.left_score += 1
        # GameConsumer.pack_data_to_send()
