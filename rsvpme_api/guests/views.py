from rest_framework import generics
from django_filters import rest_framework as filters
from .models import Guest, Event, Session
from .serializers import GuestSerializer, EventSerializer, SessionSerializer
from .filters import GuestFilter, SessionFilter

class GuestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

class GuestListCreateView(generics.ListCreateAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = GuestFilter

class EventDetailView(generics.RetrieveUpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_object(self):
        return Event.objects.first()
    
class SessionListCreateView(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = SessionFilter
    
class SessionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    lookup_field = 'session_id'