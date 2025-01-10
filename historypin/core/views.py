from rest_framework import generics
from core.models import Monument
from core.serializers import MonumentSerializer

class MonumentListAPIView(generics.ListAPIView):
    queryset = Monument.objects.all()
    serializer_class = MonumentSerializer

class MonumentDetailAPIView(generics.RetrieveAPIView):
    queryset = Monument.objects.all()
    serializer_class = MonumentSerializer
