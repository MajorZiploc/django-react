from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from django.shortcuts import get_object_or_404, redirect, render, resolve_url
from movies.models import Movie
from movies.permissions import IsOwnerOrReadOnly
from movies.serializers import MovieSerializer
from movies.pagination import CustomPagination
from movies.filters import MovieFilter
from movies.tasks import test_task
from api_crud.authorization_decorators import authorize_user
from django.contrib.auth.decorators import login_required

class ListCreateMovieAPIView(ListCreateAPIView):
  serializer_class = MovieSerializer
  queryset = Movie.objects.all()
  permission_classes = [IsAuthenticated]
  pagination_class = CustomPagination
  filter_backends = (filters.DjangoFilterBackend,)
  filterset_class = MovieFilter

  def perform_create(self, serializer):
    # logs should appear in the beat worker
    test_task.apply_async(queue='crud_api_default_queue')
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
  return render(request, 'movies/preact_ex.html', context=dict(
      movie_id=1,
      movies=[{'name': 'first movie'}]
  ))
