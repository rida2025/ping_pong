from django.contrib import admin
from django.urls import path, include
from login import views
from rest_framework_simplejwt.views import TokenRefreshView ,TokenObtainPairView, TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/matches/', views.Matches_list),
    # path('api/user/<str:username>/', views.Matches_by_user),
    path('api/', include('login.urls')),
    path ('api-auth/', include('rest_framework.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]