from django.urls import path
from .views import game_state_view

urlpatterns = [
    path('api/game-state/<str:room_name>/', game_state_view, name='game_state_view'),
]