from django.db import models

# Create your models here.
class Matches(models.Model):
    match_id = models.AutoField(primary_key=True)
    match_player_name_1 = models.CharField(max_length=100)
    match_player_name_2 = models.CharField(max_length=100)
    match_date = models.DateField()
    match_winner = models.CharField(max_length=100)
    match_loser = models.CharField(max_length=100)
    match_left_score = models.IntegerField()
    match_right_score = models.IntegerField()