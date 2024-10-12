from rest_framework import serializers
from .models import ChatRoom, Message
from login.serializers import PlayerSerializer

class ChatRoomSerializer(serializers.ModelSerializer):
	user1 = serializers.SerializerMethodField()
	user2 = serializers.SerializerMethodField()
	messages = serializers.SerializerMethodField()

	class Meta:
		model = ChatRoom
		fields = ['id', 'user1', 'user2', 'created_at', 'modified_at', 'messages']

	def get_user1(self, obj):
		return PlayerSerializer(obj.user1).data
	
	def get_user2(self, obj):
		return PlayerSerializer(obj.user2).data

	def get_messages(self, obj):
		return MessageSerializer(Message.objects.filter(chat_room=obj), many=True).data

class MessageSerializer(serializers.ModelSerializer):
	receiver = serializers.SerializerMethodField()
	sender = serializers.SerializerMethodField()

	class Meta:
		model = Message
		fields = ['id', 'chat_room', 'receiver', 'sender', 'content', 'created_at', 'is_read']
	
	def get_receiver(self, obj):
		if obj.sender == obj.chat_room.user1:
			return PlayerSerializer(obj.chat_room.user2).data
		return PlayerSerializer(obj.chat_room.user1).data

	def get_sender(self, obj):
		return PlayerSerializer(obj.sender).data