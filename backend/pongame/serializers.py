from rest_framework import serializers
from .models import Matches

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = ['id', 'Player', 'opponent', 'date', 'winner', 'loser', 'left_score', 'right_score']

class MatchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = ['id_match']