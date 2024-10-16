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

class GameStateManager:
    _game_states = {}

    @classmethod
    def get_state(cls, room_name):
        return cls._game_states.get(room_name, None)

    @classmethod
    def set_state(cls, room_name, game_state):
        cls._game_states[room_name] = game_state

    @classmethod
    def remove_state(cls, room_name):
        if room_name in cls._game_states:
            del cls._game_states[room_name]

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
            # self.close()  //doesn't make sense to close the connection here
            self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            GameStateManager.remove_state(self.room_group_name)
        # else:
        #     self.close() //doesn't make sense to close the connection here
        if self.name in GameConsumer.queue:
            del GameConsumer.queue[self.name]

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

        print('received:', data)
        action = data.get('action')
        value = data.get('value', 0)

        if action == 'connect':
            print('a user has connected')
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

            if len(GameConsumer.queue) >= 2:
                match_found = False
                matched_players = []
                players_list = list(GameConsumer.queue.items())
                
                for i, (player1, data1) in enumerate(players_list):
                    for j, (player2, data2) in enumerate(players_list):
                        if i != j:
                            if abs(data1['level'] - data2['level']) <= 5:
                                match_found = True
                                matched_players = [player1, player2]
                                break
                    if match_found:
                        break
                if match_found:
                    self.ingame = True
                    self.admin = self

                    group_name = f'game{matched_players[0]}vs{matched_players[1]}'
                    print("group_name=",group_name)
                    game_state = {
                        'ballx': 400,
                        'bally': 250,
                        'left_paddle_y': 0,
                        'right_paddle_y': 0,
                        'left_score': 0,
                        'right_score': 0,
                        'left_player': GameConsumer.queue[matched_players[0]]['username'],
                        'right_player': GameConsumer.queue[matched_players[1]]['username']
                    }
                    GameStateManager.set_state(group_name, game_state)

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
                    data = {
                        'message': 'game_started',
                        'player_id1': matched_players[0],
                        'player_1_avatar': self.game[matched_players[0]]['avatar'],
                        'player_id2': matched_players[1],
                        'player_2_avatar': self.game[matched_players[1]]['avatar'],
                        'group_name': group_name,
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

                    for player in matched_players:
                        del GameConsumer.queue[player]

        if self.ingame:
            if action == 'ArrowDown':
                if self.admin.right_paddleY <= self.admin.game_height - self.admin.racketHeight - 10:
                    self.admin.right_paddleY += value
                    # print(f'right_paddleY set to: {self.admin.right_paddleY}')
            elif action == 'ArrowUp':
                if self.admin.right_paddleY >= 10:
                    self.admin.right_paddleY -= value
                    # print(f'right_paddleY set to: {self.admin.right_paddleY}')

            if action == 's':
                if self.admin.left_paddleY <= self.admin.game_height - self.admin.racketHeight - 10:
                    self.admin.left_paddleY += value
                    # print(f'left_paddleY set to: {self.admin.left_paddleY}')
            elif action == 'w':
                if self.admin.left_paddleY >= 10:
                    self.admin.left_paddleY -= value
                    # print(f'left_paddleY set to: {self.admin.left_paddleY}')

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
            'ball_radius': 15,
        }


        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_data',
                'message': data
            }
        )
        packet = {
            'message': 'game_data',
            'ballx': self.ballx,
            'bally': self.bally,
            'right_paddleY': self.right_paddleY,
            'left_paddleY': self.left_paddleY,
            'right_score': self.right_score,
            'left_score': self.left_score,
            'game_width': self.game_width,
            'game_height': self.game_height,
        }
        GameStateManager.set_state(self.room_group_name, packet)
    
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
            # start_time = time.time()
            await self.gamelogic()
            # end_time = time.time()
            # execution_time = end_time - start_time
            # print(f"gamelogic() execution time: {execution_time:.6f} seconds")
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
            if (self.right_score >= 5):
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

                GameStateManager.remove_state(self.room_group_name)

                values = list(self.game.values())

                first_element = values[0]
                second_element = values[1]

                first_player = await sync_to_async(Player.objects.get)(username=first_element['username'])
                second_player = await sync_to_async(Player.objects.get)(username=second_element['username'])

                first_player.losses += 1
                first_player.exp_game += 1
                second_player.wins += 1
                second_player.exp_game += 10

                await sync_to_async(first_player.save)()
                await sync_to_async(second_player.save)()

                match = await sync_to_async(Matches.objects.create)(
                    player=first_player,
                    opponent=second_player,
                    date=timezone.now().date(),
                    winner=second_player.username,
                    loser=first_player.username,
                    left_score=self.left_score,
                    right_score=self.right_score
                )
                await sync_to_async(match.save)()


        elif self.ballx >= self.game_width - 15:
            self.ballx = 400
            self.bally = 250
            self.balldirectionX = 1
            self.balldirectionY = random.uniform(-1, 1)
            self.left_score += 1
            self.bonus = 0
            if (self.left_score >= 5):
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

                GameStateManager.remove_state(self.room_group_name)

                values = list(self.game.values())

                first_element = values[0]
                second_element = values[1]
                first_player = await sync_to_async(Player.objects.get)(username=first_element['username'])
                second_player = await sync_to_async(Player.objects.get)(username=second_element['username'])

                first_player.wins += 1
                first_player.exp_game += 10
                second_player.losses += 1
                second_player.exp_game += 1

                await sync_to_async(first_player.save)()
                await sync_to_async(second_player.save)()

                match = await sync_to_async(Matches.objects.create)(
                    player=first_player,
                    opponent=second_player,
                    date=timezone.now().date(),
                    winner=first_player.username,
                    loser=second_player.username,
                    left_score=self.left_score,
                    right_score=self.right_score
                )
                await sync_to_async(match.save)()
        await self.pack_data_to_send()


class inviteConsumer(AsyncWebsocketConsumer):
    game_queue = {}
    started_games = {}
    room_group_name = ''
    name = ''
    admin = None
    ingame = False
    inqueue = False
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

    async def connect(self):
        await self.accept()
        print('Connected')

    async def disconnect(self, close_code):
        print('Disconnected')
        if self.ingame:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_message',
                    'message': 'disconnected',
                }
            )
            self.game_loop = False
            self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
        if self.inqueue:
            del inviteConsumer.game_queue[self.name]

    async def receive(self, text_data):
        if not text_data.strip():
            print('Received empty message')
            return
        
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            print('Received malformed JSON')
            return

        action = data.get('action')
        # value = data.get('value')
        
        #this case for invite friend to play
        print('we received something:', data)
        if action == 'friend_game':
            game_key = data.get('game_id')
            print(f"Game key: {game_key}")
            inviteConsumer.game_queue[game_key] = {
                'player1':  {
                    'username': data.get('player1'),
                    'channel_name': None,
                    'avatar1': data.get('avatar1'),
                    'instance': None,
                },
                'player2': {
                    'username': data.get('player2'),
                    'channel_name': None,
                    'avatar2': data.get('avatar2'),
                    'instance': None,
                },
                'counter': 30,
                'connected': 0,
            }
            # Start the countdown in a separate thread
            asyncio.create_task(self.start_countdown(game_key))
            return

        #this case if a player join the (invite friend game)
        if action == 'connect':
            print('a user has connected')
            username = data.get('username')
            if len(inviteConsumer.game_queue) > 0:
                print('game queue is not empty')
                game_id = data.get('game_id')
                print('game_id:', game_id)
                game = inviteConsumer.game_queue[game_id]
                if game is not None:
                    game['connected'] += 1
                    if game['player1']['username'] == username:
                        game['player1']['channel_name'] = self.channel_name
                        game['player1']['instance'] = self
                    elif game['player2']['username'] == username:
                        game['player2']['channel_name'] = self.channel_name
                        game['player2']['instance'] = self
                    print(f"Player {username} joined game")
                    if (game['connected'] == 2):
                        game['player1']['instance'].ingame = True
                        game['player2']['instance'].ingame = True
                        game['player1']['instance'].admin = self
                        game['player2']['instance'].admin = self
                        group_name = f"{game['player1']['username']}vs{game['player2']['username']}"
                        game['player1']['instance'].room_group_name = group_name
                        game['player2']['instance'].room_group_name = group_name
                        game_state = {
                            'ballx': 400,
                            'bally': 250,
                            'left_paddle_y': 0,
                            'right_paddle_y': 0,
                            'left_score': 0,
                            'right_score': 0,
                            'left_player': game['player1']['username'],
                            'right_player': game['player2']['username']
                        }
                        GameStateManager.set_state(group_name, game_state)

                        await self.channel_layer.group_add(
                            self.room_group_name,
                            game['player1']['channel_name']
                        )
                        await self.channel_layer.group_add(
                            self.room_group_name,
                            game['player2']['channel_name']
                        )
                        data = {
                            'message': 'game_started',
                            'player_id1': game['player1']['username'],
                            'player_1_avatar': game['player1']['avatar1'],
                            'player_id2': game['player2']['username'],
                            'player_2_avatar': game['player2']['avatar2'],
                        }
                        await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                'type': 'game_data',
                                'message': data
                            }
                        )
                        self.game_loop = True
                        # print(f"game key = {data.get('player1')}vs{data.get('player2')}")
                        game_key = game['player1']['username'] + 'vs' + game['player2']['username']
                        del inviteConsumer.game_queue[game_key]
                        asyncio.create_task(self.run_60_times_per_second())
                else:
                    # he is not in any of the friend games
                    message = "Leave"
                    await self.send(text_data=json.dumps({'message': message}))
            else:
                # there are no friends games
                message = "Leave"
                await self.send(text_data=json.dumps({'message': message}))

        print("maybe it was me")
        if self.ingame:
            print("yes it could be me")
            if action == 'ArrowDown':
                if self.admin.right_paddleY <= self.admin.game_height - self.admin.racketHeight - 10:
                    self.admin.right_paddleY += 10
            elif action == 'ArrowUp':
                if self.admin.right_paddleY >= 10:
                    self.admin.right_paddleY -= 10

            if action == 's':
                if self.admin.left_paddleY <= self.admin.game_height - self.admin.racketHeight - 10:
                    self.admin.left_paddleY += 10
            elif action == 'w':
                if self.admin.left_paddleY >= 10:
                    self.admin.left_paddleY -= 10
            print("it not me")

    async def run_60_times_per_second(self):
        while self.game_loop:
            start_time = time.time()
            await self.gamelogic()
            end_time = time.time()
            execution_time = end_time - start_time
            print(f"gamelogic() execution time: {execution_time:.6f} seconds")
            await asyncio.sleep(1/60)

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
            'ball_radius': 15,
        }


        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_data',
                'message': data
            }
        )
        packet = {
            'message': 'game_data',
            'ballx': self.ballx,
            'bally': self.bally,
            'right_paddleY': self.right_paddleY,
            'left_paddleY': self.left_paddleY,
            'right_score': self.right_score,
            'left_score': self.left_score,
            'game_width': self.game_width,
            'game_height': self.game_height,
        }
        GameStateManager.set_state(self.room_group_name, packet)
    
    async def game_data(self, event):
        data = event['message']
        await self.send(text_data=json.dumps(data))

    async def game_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def start_countdown(self, game_id):
        while game_id in inviteConsumer.game_queue:
            game = inviteConsumer.game_queue.get(game_id)
            if game is None or game['counter'] <= 0:
                print(f"Game {game_id} expired, removing from the queue.")
                inviteConsumer.game_queue.pop(game_id, None)
                break

            # Sleep for 1 second and decrease the counter
            await asyncio.sleep(1)
            if game_id in inviteConsumer.game_queue:
                inviteConsumer.game_queue[game_id]['counter'] -= 1
        print("game started or expired")
    
    async def run_60_times_per_second(self):
        while self.game_loop:
            # start_time = time.time()
            await self.gamelogic()
            # end_time = time.time()
            # execution_time = end_time - start_time
            # print(f"gamelogic() execution time: {execution_time:.6f} seconds")
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
            if (self.right_score >= 5):
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

                GameStateManager.remove_state(self.room_group_name)

        elif self.ballx >= self.game_width - 15:
            self.ballx = 400
            self.bally = 250
            self.balldirectionX = 1
            self.balldirectionY = random.uniform(-1, 1)
            self.left_score += 1
            self.bonus = 0
            if (self.left_score >= 5):
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

                GameStateManager.remove_state(self.room_group_name)
        await self.pack_data_to_send()
        