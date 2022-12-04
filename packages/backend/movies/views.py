from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from .models import Movie
from .permissions import IsOwnerOrReadOnly
from .serializers import MovieSerializer
from .pagination import CustomPagination
from .filters import MovieFilter
from .tasks import test_task


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
