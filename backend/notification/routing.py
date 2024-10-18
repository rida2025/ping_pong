
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/notif/$', consumers.NotificationConsumer.as_asgi()),
    # re_path(r'ws/notif/FR/(?P<user_id>\d+)/$', consumers.FriendRequestConsumer.as_asgi()),
    # re_path(r'ws/notif/GR/(?P<game_type>P|TTT)/(?P<user_id>\d+)/$', consumers.GameRequestConsumer.as_asgi()),
]
