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
    exp_game = models.IntegerField(default=0)
    status_network = models.CharField(max_length=10, choices=STATUS, default='offline')
    status_game = models.CharField(max_length=10, choices=STATUS_GAME, default='offline')
    two_factor = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, default='000000')
    otp_verified = models.BooleanField(default=False)
    blocked_users = models.ManyToManyField('self', symmetrical=False, related_name='blocked_by', blank=True)
    # lst_friends = models.ManyToManyField('self', symmetrical=False, related_name='friend', blank=True)
    # lst_pending_friends = models.ManyToManyField('self', symmetrical=False, related_name='pending_friend', blank=True)
   

    class Meta:
            db_table = 'player'

    def block_user(self, user_to_block):
        self.blocked_users.add(user_to_block)

    def unblock_user(self, user_to_unblock):
        self.blocked_users.remove(user_to_unblock)

    def is_blocked(self, user):
        return self.blocked_users.filter(id=user.id).exists() 

    @staticmethod
    def are_enemies(user1, user2):
        return user1.is_blocked(user2) or user2.is_blocked(user1)
