
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_pk>\d+)/$', consumers.ChatConsumer.as_asgi()),
	re_path(r'ws/notification/$', consumers.UserNotificationConsumer.as_asgi()),
]
