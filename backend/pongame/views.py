# views.py
from django.http import JsonResponse
from .consumers import GameStateManager
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def game_state_view(request, room_name):
    game_state = GameStateManager.get_state(f'{room_name}')
    if game_state:
        return JsonResponse(game_state)
    else:
        return JsonResponse({'error': 'Game state not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_data(request):
    context = {
        'user': request.user.username,
        'level': request.user.level,
        'avatar': request.user.avatar,
    }
    return JsonResponse(context)