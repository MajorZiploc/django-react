from django.urls import path
from integrations import views

app_name = 'integrations'
urlpatterns = [
    path('movies', views.ListCreateMovieAPIView.as_view(), name='get_post_movies'),
    path('movies/<str:pk>', views.RetrieveUpdateDestroyMovieAPIView.as_view(), name='get_delete_update_movie'),
    path('movies/all', views.ListMovieAPIView.as_view(), name='list_movies'),
    path('movies/filter-data', views.MovieFilterDataAPIView.as_view(), name='movie_filter_data'),
    path('movies/support/<str:id>/preact', views.support_preact, name='support_preact'),
    path('movies/support/get_movies_dirty', views.get_movies_dirty, name='get_movies_dirty'),
    path('movies/support/htmx', views.support_htmx, name='support_htmx'),
    path('movies/support/<str:id>/delete', views.delete_movie, name='delete_movie'),
    path('movies/support/<str:id>/save', views.save_movie, name='save_movie'),
    path('movies/support/genres-data', views.load_genres, name='load_genres'),
    path('movies/support/<str:id>/alpine', views.support_alpine, name='support_alpine'),
    path('movies/support/alpine/<str:id>/save', views.save_movie_alpine, name='save_movie_alpine'),
]
