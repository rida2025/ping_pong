from django.db import models
from login.models import Player
from django.utils import timezone

# Create your models here.
class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('FR', 'Friend Request'),
        ('GR', 'Game Request'),
    ]
    GAME_TYPES = [
        ('PG', 'Pong'),
        ('TT', 'TicTacToe'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('cancelled', 'Cancelled'),
        ('declined', 'Declined'),
        ('expired', 'Expired'),
    ]
    notif_type = models.CharField(max_length=2, choices=NOTIFICATION_TYPES)
    from_user = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='sent_notifications')
    to_user = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='received_notifications')
    game_type = models.CharField(max_length=2, choices=GAME_TYPES, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['from_user', 'to_user', 'notif_type', 'game_type'],
                condition=models.Q(status='pending'),
                name='unique_pending_notification'
            )
        ]
    
    def __str__(self):
        return f"{self.get_notif_type_display()} from {self.from_user} to {self.to_user}"
    
    def save(self, *args, **kwargs):
        if self.notif_type == 'GR' and not self.game_type:
            raise ValueError("Game type must be specified for game requests.")
        super().save(*args, **kwargs)

    def is_expired(self):
        return self.created_at + timezone.timedelta(seconds=30) < timezone.now()

    