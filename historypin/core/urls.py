from django.urls import path
from core.views import MonumentListAPIView, MonumentDetailAPIView

urlpatterns = [
    path('monuments/', MonumentListAPIView.as_view(), name='monument-list'),
    path('monuments/<int:pk>/', MonumentDetailAPIView.as_view(), name='monument-detail'),
]
