from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import ChatRoom
from .serializers import ChatRoomSerializer

@receiver(post_save, sender=ChatRoom)
def notify_room_creation(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        room_data = ChatRoomSerializer(instance).data
        for user in [instance.user1, instance.user2]:
            async_to_sync(channel_layer.group_send)(
                f'user_{user.id}_notification',
                {
                    'type': 'new_room_notification',
                    'room_data': room_data
                }
            )