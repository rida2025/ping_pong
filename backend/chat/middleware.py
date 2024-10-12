from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
# from django.contrib.auth.models import AnonymousUser
from login.models import Player
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from urllib.parse import parse_qs 

Player = get_user_model()

@database_sync_to_async
def get_user(token):
    try:
        access_token = AccessToken(token)
        user_id = access_token['user_id']
        return Player.objects.get(id=user_id)
    except (InvalidToken, TokenError, Player.DoesNotExist):
        return None

class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope['query_string'].decode()
        query_params = parse_qs(query_string)
        token = query_params.get('token', [None])[0]
        if token:
            scope['user'] = await get_user(token)
        else:
            scope['user'] = None
        return await self.inner(scope, receive, send)

def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(AuthMiddlewareStack(inner))