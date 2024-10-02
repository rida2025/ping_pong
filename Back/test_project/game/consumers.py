import json
import time
import random
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import asyncio
from channels.layers import get_channel_layer
from login.models import Player
from matches.models import Matches
from django.utils import timezone

class GameConsumer(AsyncWebsocketConsumer):
    name = ''
    avatar = ''
    room_group_name = ''
    ingame = False
    admin = None
    game = {}
    queue = {}
    instances = {}
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
    ball_speed = 800 / (2 * 60) + bonus
    heartbeat = 5

    async def connect(self):
        await self.accept()
        
    async def disconnect(self, close_code):
        if self.ingame:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_message',
                    'message': 'disconnected',
                }
            )
            self.admin.game_loop = False
            self.close()
            self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
        else:
            self.close()
        if self.name in GameConsumer.queue:
            del GameConsumer.queue[self.name]

    async def monitor_heartbeat(self):
        while self.heartbeat > 0:
            print(f'decreasing heartbeat {self.heartbeat} from {self.name}')
            self.heartbeat -= 0.2
            await asyncio.sleep(0.2)
        print('Client disconnected')
        if (self.ingame):
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_message',
                    'message': 'disconnected',
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

        if action == 'connect':
            #stop the connection if he already in the queue
            if (data.get('username') in GameConsumer.queue):
                self.close()
            GameConsumer.queue[data.get('username')] = {
                'username': data.get('username'),
                'level': data.get('level'),
                'avatar': data.get('avatar'),
                'channel_name': self.channel_name,
                'group_name': ''
            }
            self.name = data.get('username')
            self.avatar = data.get('avatar')
            GameConsumer.instances[self.name] = self
            print("avatar=[",data.get('avatar'),"]")
            print('client connected', self.avatar)
            asyncio.create_task(self.monitor_heartbeat())

            #now need to check if we have 2 in queue can that be matched
            if len(GameConsumer.queue) >= 2:
                print('start searching for match')
                match_found = False
                matched_players = []
                for player1, data1 in GameConsumer.queue.items():
                    for player2, data2 in GameConsumer.queue.items():
                        # print(f'{player1} vs {player2}')
                        if player1 != player2 and abs(data1['level'] - data2['level']) <= 5:
                            match_found = True
                            matched_players = [player1, player2]
                            break
                    if match_found:
                        break
                print('searching done')
                if match_found:
                    # Start the game
                    self.ingame = True
                    self.admin = self
                    print('Match found')

                    #create game name
                    group_name = f'game.{matched_players[0]}vs{matched_players[1]}'
                    print(f'matched player1 {matched_players[0]}, player2 {matched_players[1]}')
                    self.game[matched_players[0]] = {
                        'username': GameConsumer.queue[matched_players[0]]['username'],
                        'avatar': GameConsumer.queue[matched_players[0]]['avatar'],
                        'level': GameConsumer.queue[matched_players[0]]['level'],
                        'player_id': 1,
                    }
                    self.game[matched_players[1]] = {
                        'username': GameConsumer.queue[matched_players[1]]['username'],
                        'avatar': GameConsumer.queue[matched_players[1]]['avatar'],
                        'level': GameConsumer.queue[matched_players[1]]['level'],
                        'player_id': 2,
                    }
                    if (self.name == matched_players[0]):
                        myenemy = matched_players[1]
                    else:
                        myenemy = matched_players[0]
                    if myenemy in GameConsumer.instances:
                        GameConsumer.instances[myenemy].game = self.game
                        GameConsumer.instances[myenemy].ingame = True
                        GameConsumer.instances[myenemy].room_group_name = group_name
                        GameConsumer.instances[myenemy].admin = self

                    await self.channel_layer.group_add(
                        group_name,
                        GameConsumer.queue[matched_players[0]]['channel_name']
                    )
                    await self.channel_layer.group_add(
                        group_name,
                        GameConsumer.queue[matched_players[1]]['channel_name']
                    )
                    self.room_group_name = group_name
                    print('Game started')
                    data = {
                        'message': 'game_started',
                        'player_id1': matched_players[0],
                        'player_1_avatar': self.game[matched_players[0]]['avatar'],
                        'player_id2': matched_players[1],
                        'player_2_avatar': self.game[matched_players[1]]['avatar'],
                    }
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'game_data',
                            'message': data
                        }
                    )
                    self.game_loop = True
                    asyncio.create_task(self.run_60_times_per_second())
                    # asyncio.create_task(self.pack_data_to_send())
                
                    # Remove matched players from the queue
                    for player in matched_players:
                        del GameConsumer.queue[player]

        if action == 'state':
            self.heartbeat = value

        if self.ingame:
            if action == 'ArrowDown':
                if self.admin.right_paddleY <= self.admin.game_height - self.admin.racketHeight - 10:
                    self.admin.right_paddleY += value
                    print(f'right_paddleY set to: {self.admin.right_paddleY}')
            elif action == 'ArrowUp':
                if self.admin.right_paddleY >= 10:
                    self.admin.right_paddleY -= value
                    print(f'right_paddleY set to: {self.admin.right_paddleY}')

            if action == 's':
                if self.admin.left_paddleY <= self.admin.game_height - self.admin.racketHeight - 10:
                    self.admin.left_paddleY += value
                    print(f'left_paddleY set to: {self.admin.left_paddleY}')
            elif action == 'w':
                if self.admin.left_paddleY >= 10:
                    self.admin.left_paddleY -= value
                    print(f'left_paddleY set to: {self.admin.left_paddleY}')

    async def pack_data_to_send(self):
        data = {
            'ballx': self.ballx,
            'bally': self.bally,
            'right_paddleY': self.right_paddleY,
            'left_paddleY': self.left_paddleY,
            'right_score': self.right_score,
            'left_score': self.left_score,
            'game_width': self.game_width,
            'game_height': self.game_height,
            'ball_radius': 15,
        }
        
        await self.channel_layer.group_send(
            self.room_group_name,
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

    async def run_60_times_per_second(self):
        while self.game_loop:
            await self.gamelogic()
            # await self.pack_data_to_send()
            await asyncio.sleep(1/60)
    
    async def gamelogic(self):
        self.ballx += (self.ball_speed + self.bonus) * self.balldirectionX
        self.bally += (self.ball_speed + self.bonus) * self.balldirectionY

        if (self.ballx + 15 >= self.game_width - self.racketWidth and
            self.right_paddleY <= (self.bally + 15) and
            self.right_paddleY + self.racketHeight >= (self.bally - 15)):

            offset = (self.bally - (self.right_paddleY + self.racketHeight / 2)) / (self.racketHeight / 2)
            self.ballx = self.game_width - self.racketWidth - 16
            self.balldirectionX *= -1
            self.balldirectionY = offset
            self.bonus = min(2, self.bonus + 1)

        elif (self.ballx - 15 <= self.racketWidth and
            self.left_paddleY <= (self.bally + 15) and
            self.left_paddleY + self.racketHeight >= (self.bally - 15)):

            offset = (self.bally - (self.left_paddleY + self.racketHeight / 2)) / (self.racketHeight / 2)
            self.ballx = self.racketWidth + 16
            self.balldirectionX *= -1
            self.balldirectionY = offset
            self.bonus = min(2, self.bonus + 1)

        elif self.bally - 15 <= 0:
            self.bally = 16
            self.balldirectionY *= -1
        
        elif self.bally + 15 >= self.game_height:
            self.bally = self.game_height - 16
            self.balldirectionY *= -1
        
        elif self.ballx <= 15:
            self.ballx = 400
            self.bally = 250
            self.balldirectionX = -1  
            self.balldirectionY = random.uniform(-1, 1)
            self.right_score += 1
            if (self.right_score == 3):
                self.game_loop = False
                data = {
                    'winner': '2',
                    'left_score': self.left_score,
                    'loser': '1',
                    'right_score': self.right_score
                }
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_data',
                        'message': data
                    }
                )
                # Get a list of all the values in the dictionary
                values = list(self.game.values())

                # Access the first and second elements
                first_element = values[0]
                second_element = values[1]
                matchs = await sync_to_async(Matches)(
                    player_name_1=first_element['username'],
                    player_name_2=second_element['username'],
                    date=timezone.now().date(),
                    winner=second_element['username'],
                    loser=first_element['username'],
                    left_score=self.left_score,
                    right_score=self.right_score
                )
                await sync_to_async(matchs.save)()


        elif self.ballx >= self.game_width - 15:
            self.ballx = 400
            self.bally = 250
            self.balldirectionX = 1
            self.balldirectionY = random.uniform(-1, 1)
            self.left_score += 1
            if (self.left_score == 3):
                self.game_loop = False
                data = {
                    'winner': '1',
                    'left_score': self.left_score,
                    'loser': '2',
                    'right_score': self.right_score
                }
                await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_data',
                    'message': data
                })
                # Get a list of all the values in the dictionary
                values = list(self.game.values())

                first_element = values[0]
                second_element = values[1]
                matchs = await sync_to_async(Matches)(
                    player_name_1=first_element['username'],
                    player_name_2=second_element['username'],
                    date=timezone.now().date(),
                    winner=first_element['username'],
                    loser=second_element['username'],
                    left_score=self.left_score,
                    right_score=self.right_score
                )
                await sync_to_async(matchs.save)()

        await self.pack_data_to_send()
