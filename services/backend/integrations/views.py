import json
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from django.shortcuts import get_object_or_404, redirect, render, resolve_url
from integrations.models import Movie
from integrations.permissions import IsOwnerOrReadOnly
from integrations.serializers import MovieSerializer
from integrations.pagination import CustomPagination
from integrations.filters import MovieFilter
from integrations.tasks import test_task
from api_crud.authorization_decorators import authorize_user
from django.contrib.auth.decorators import login_required
from api_crud.settings.base import REDIS_CLIENT

class ListCreateMovieAPIView(ListCreateAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MovieFilter

    def perform_create(self, serializer):
        # REDIS CACHE EXAMPLE BEGIN
        data_to_cache = {
            "stuff1": 'hi stuff1',
            "stuff2": ['hi', 'stuff2'],
            "stuff3": {
                'greet': 'hi',
                'things': ['stuff3', 'stuff3s_cat']
            },
        }
        cache = REDIS_CLIENT
        cache_key = "yogurt"
        # Set the value in the cache with expiration time and milliseconds parameter
        # ex=1800 = expires in 1800 seconds (30 minutes)
        cache.set(cache_key, json.dumps(data_to_cache), ex=1800)
        cache_value = cache.get(cache_key)
        cache_data = json.loads(cache_value.decode())
        print('cache_data')
        print(cache_data)
        cache.delete(cache_key)
        # Redis Cache Example END
        # FIRE EVENT EXAMPLE BEGIN
        # logs should appear in the beat worker
        test_task.apply_async(queue='crud_api_default_queue')
        # FIRE EVENT EXAMPLE END
        # Assign the user who created the movie
        serializer.save(creator=self.request.user)

class RetrieveUpdateDestroyMovieAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

# NOTE: authorize_user to 403 non logged in django users
# @authorize_user
@login_required
def support_page(request):
    return render(request, 'integrations/preact_ex.html', context=dict(
        movie_id=1,
        movies=[{'name': 'first movie'}]
    ))
