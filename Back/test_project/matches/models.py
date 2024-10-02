from django.db import models
from login.models import Player

# Create your models here.
class Matches(models.Model):
    player_name_1 = models.CharField(max_length=100)
    player_name_2 = models.CharField(max_length=100)
    date = models.DateField()
    winner = models.CharField(max_length=100)
    loser = models.CharField(max_length=100)
    left_score = models.IntegerField()
    right_score = models.IntegerField()
