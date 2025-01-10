from rest_framework import serializers
from core.models import Monument

class MonumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monument
        fields = ['id', 'name', 'description', 'address', 'latitude', 'longitude', 'image_url', 'city']
