from django.urls import path
from . import views

urlpatterns = [
    path('event/', views.EventDetailView.as_view(), name='event-detail'),
    path('guests/', views.GuestListCreateView.as_view(), name='guest-list'),
    path('guests/<int:pk>/', views.GuestDetailView.as_view(), name='guest-detail'),
    path('sessions/', views.SessionListCreateView.as_view(), name='session-list'),
    path('sessions/<uuid:session_id>/', views.SessionDetailView.as_view(), name='session-detail'),
]