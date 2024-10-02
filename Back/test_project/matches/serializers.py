from rest_framework import serializers
from .models import Matches

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = ['id', 'player_name_1', 'player_name_2', 'date', 'winner', 'loser', 'left_score', 'right_score']