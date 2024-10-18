from rest_framework import serializers
from .models import Notification
from login.serializers import PlayerSerializer
from login.models import Player

class NotificationSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'from_user', 'to_user', 'notif_type', 'game_type', 'status', 'created_at']

    def get_from_user(self, obj):
        return PlayerSerializer(obj.from_user).data

    def get_to_user(self, obj):
        return PlayerSerializer(obj.to_user).data