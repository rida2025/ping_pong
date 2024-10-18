 
from rest_framework import serializers

from .models import Player


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'username', 'avatar', 'email', 'wins', 'losses', 'exp_game', 'status_network', 'two_factor', 'otp', 'otp_verified', 'blocked_users']



# class TwoFASerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Player
#         fields = ['two_factor']