# views.py
from django.http import JsonResponse
from .consumers import GameStateManager

def game_state_view(request, room_name):
    print("inside game_state_view=[", room_name, "]")
    game_state = GameStateManager.get_state(f'{room_name}')
    if game_state:
        return JsonResponse(game_state)
    else:
        return JsonResponse({'error': 'Game state not found'}, status=404)