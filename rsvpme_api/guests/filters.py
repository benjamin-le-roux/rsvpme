import django_filters
from django.contrib.postgres.search import TrigramSimilarity
from .models import Guest, Session

class GuestFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Guest
        fields = ['name']

    def filter_by_name(self, queryset, name, value):
        return queryset.annotate(
            similarity = TrigramSimilarity('name', value)
        ).filter(similarity__gt = 0.3).order_by('-similarity')
    

class SessionFilter(django_filters.FilterSet):
    guest = django_filters.NumberFilter(field_name='guest__id')

    class Meta:
        model = Session
        fields = ['guest']