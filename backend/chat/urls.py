from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.list_chat, name="chat"),
    # path('api/login/', views.login_view, name='login'),
    # path('api/logout/', views.logout_view, name='logout'),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
