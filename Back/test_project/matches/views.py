from django.http.response import JsonResponse
from .models import Matches
from .serializers import MatchesSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def Matches_list(request):
    if request.method == 'GET':
        data = Matches.objects.all()
        serializer = MatchesSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)