from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/remote-game/', consumers.GameConsumer.as_asgi()),
    re_path(r'ws/remote-game/(?P<room_name>\w+)/$', consumers.GameConsumer.as_asgi()),
    re_path(r'ws/play-friend/', consumers.inviteConsumer.as_asgi()),
]