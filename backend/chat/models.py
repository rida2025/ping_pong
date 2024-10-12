from django.db import models

# Create your models here.
from login.models import Player
from django.utils import timezone

class ChatRoom(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="chat_room_user1")
    user2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="chat_room_user2")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user1', 'user2']
        ordering = ['modified_at']

    def get_other_user(self, user):
        return self.user2 if user == self.user1 else self.user1
    
    @classmethod
    def get_next_id(cls):
        max_id = cls.objects.all().aggregate(models.Max('id'))['id__max']
        return max_id + 1 if max_id is not None else 1000
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.get_next_id()
        super().save(*args, **kwargs)

class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="sent_message")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']

    def get_messages(self):
        return self.objects.all().order_by('created_at')
    
    def save(self, *args, **kwargs):
        self.chat_room.modified_at = timezone.now()
        self.chat_room.save()
        super().save(*args, **kwargs)