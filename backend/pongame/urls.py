from django.urls import path
from . import views

urlpatterns = [
    path('api/game-state/<str:room_name>/', views.game_state_view, name='game_state_view'),
    path('', views.user_data, name="user"),
]