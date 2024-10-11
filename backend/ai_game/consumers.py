import json
import time
import random
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import asyncio
import numpy as np
from stable_baselines3 import PPO

class AiGame(AsyncWebsocketConsumer):
    name = ''
    avatar = ''
    ingame = False
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

    async def connect(self):
        print('connected')
        await self.accept()
        
    async def disconnect(self, close_code):
        print('disconnected')
        if self.ingame:
            data = {
                'message': 'disconnected',
            }
            await self.send(text_data=json.dumps(data))
            self.close()
        else:
            self.close()

    async def receive(self, text_data):
        print('received')
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
            data = {
                'message': 'game_started'
            }
            await self.send(text_data=json.dumps(data))
            self.ingame = True
            self.game_loop = True
            asyncio.create_task(self.run_60_times_per_second())
        print('action:', action, 'is in game:', self.ingame)
        if self.ingame:
            if action == 'ArrowDown':
                if self.right_paddleY <= self.game_height - self.racketHeight - 10:
                    self.right_paddleY += value
            elif action == 'ArrowUp':
                if self.right_paddleY >= 10:
                    self.right_paddleY -= value

    async def pack_data_to_send(self):
        data = {
            'message': 'game_data',
            'ballx': self.ballx,
            'bally': self.bally,
            'right_paddleY': self.right_paddleY,
            'left_paddleY': self.left_paddleY,
            'right_score': self.right_score,
            'left_score': self.left_score,
            'game_width': self.game_width,
            'game_height': self.game_height,
            # 'ball_radius': 15,
        }

        await self.send(text_data=json.dumps(data))
    
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
            self.bonus += 1

        elif (self.ballx - 15 <= self.racketWidth and
            self.left_paddleY <= (self.bally + 15) and
            self.left_paddleY + self.racketHeight >= (self.bally - 15)):

            offset = (self.bally - (self.left_paddleY + self.racketHeight / 2)) / (self.racketHeight / 2)
            self.ballx = self.racketWidth + 16
            self.balldirectionX *= -1
            self.balldirectionY = offset
            self.bonus += 1

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
            self.bonus = 0
            if (self.right_score >= 1000):
                self.game_loop = False
                data = {
                    'winner': 'you',
                    'left_score': self.left_score,
                    'loser': 'ai',
                    'right_score': self.right_score
                }
                await self.send(text_data=json.dumps(data))

        elif self.ballx >= self.game_width - 15:
            self.ballx = 400
            self.bally = 250
            self.balldirectionX = 1
            self.balldirectionY = random.uniform(-1, 1)
            self.left_score += 1
            self.bonus = 0
            if (self.left_score >= 1000):
                self.game_loop = False
                data = {
                    'winner': '1',
                    'left_score': self.left_score,
                    'loser': '2',
                    'right_score': self.right_score
                }
                await self.send(text_data=json.dumps(data))
        await self.pack_data_to_send()
