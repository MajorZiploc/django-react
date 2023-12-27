from django.urls import path
from integrations import views

app_name = 'integrations'
urlpatterns = [
    path('movies', views.ListCreateMovieAPIView.as_view(), name='get_post_movies'),
    path('movies/<int:pk>', views.RetrieveUpdateDestroyMovieAPIView.as_view(), name='get_delete_update_movie'),
    path('movies/support', views.support_page, name='support_page'),
    path('movies/all', views.ListMovieAPIView.as_view(), name='list_movies'),
    path('movies/filter-data', views.MovieFilterDataAPIView.as_view(), name='movie_filter_data'),
]
