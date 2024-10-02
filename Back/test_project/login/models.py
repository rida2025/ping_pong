from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import AbstractUser

class Player(AbstractUser):
    STATUS = (
        ('online', _('online')),
        ('offline', _('offline')),
    )
    STATUS_GAME = (
        ('waiting', _('waiting')),
        ('playing', _('playing')),
        ('finished', _('finished')),
        ('offline', _('offline')),
    )
    username = models.CharField(max_length=255, default='default_username', unique=True, blank=False)
    avatar = models.URLField(max_length=200, default='default_avatar')
    email = models.EmailField(max_length=200, default='default')
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    exp_game = models.IntegerField(default=0)
    status_network = models.CharField(max_length=10, choices=STATUS, default='offline')
    status_game = models.CharField(max_length=10, choices=STATUS_GAME, default='offline')
    two_factor = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, default='000000')
    otp_verified = models.BooleanField(default=False)
    match_history = models.ManyToManyField('MatchHistory', related_name='match_history', blank=True)


    def __str__(self):
        return self.username


    class Meta:
        db_table = 'player'


#------------------------------------------------------------------------------------------------
class MatchHistory(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE , related_name='player')
    opponent = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='opponent')
    score_player = models.IntegerField(default=0)
    score_opponent = models.IntegerField(default=0)
    winner = models.CharField(max_length=255, default='default_winner')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.player.username

    class Meta:
        db_table = 'match_history'
