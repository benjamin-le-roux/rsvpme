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
    guest_id = serializers.PrimaryKeyRelatedField(
        queryset = Guest.objects.all(),
        write_only=True,
        source='guest'
    )

    class Meta:
        model = Session
        fields = '__all__'

    def create(self, validated_data):
        return Session.objects.create(**validated_data)