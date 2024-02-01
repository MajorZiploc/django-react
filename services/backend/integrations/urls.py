from django.urls import path
from integrations import views

app_name = 'integrations'
urlpatterns = [
    path('movies', views.ListCreateMovieAPIView.as_view(), name='get_post_movies'),
    path('movies/<str:pk>', views.RetrieveUpdateDestroyMovieAPIView.as_view(), name='get_delete_update_movie'),
    path('movies/<str:id>/support', views.support_page, name='support_page'),
    path('movies/all', views.ListMovieAPIView.as_view(), name='list_movies'),
    path('movies/filter-data', views.MovieFilterDataAPIView.as_view(), name='movie_filter_data'),
    path('movies/config_store/get_movies_dirty', views.get_movies_dirty, name='get_movies_dirty'),
    path('movies/config_store/main', views.config_store_main, name='config_store_main'),
    path('movies/config_store/<str:id>/delete', views.delete_movie, name='delete_movie'),
    path('movies/config_store/<str:id>/save', views.save_movie, name='save_movie'),
    path('movies/config_store/genres-data', views.load_genres, name='load_genres'),
]
