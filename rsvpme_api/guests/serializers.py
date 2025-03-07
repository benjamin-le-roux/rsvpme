from rest_framework import serializers
from .models import Guest, Event, Session

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    guest = GuestSerializer(read_only=True)

    class Meta:
        model = Session
        fields = '__all__'