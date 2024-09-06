from rest_framework import serializers
from .models import Matches

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = ['match_id', 'match_player_name_1', 'match_player_name_2', 'match_date', 'match_winner', 'match_loser', 'match_left_score', 'match_right_score']