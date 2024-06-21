from django.urls import path
from integrations import views

app_name = 'integrations'
urlpatterns = [
    path('movies', views.ListCreateMovieAPIView.as_view(), name='get_post_movies'),
    path('movies/<str:pk>', views.RetrieveUpdateDestroyMovieAPIView.as_view(), name='get_delete_update_movie'),
    path('movies/all', views.ListMovieAPIView.as_view(), name='list_movies'),
    path('movies/filter-data', views.MovieFilterDataAPIView.as_view(), name='movie_filter_data'),
    path('movies/support/<str:id>/preact', views.support_preact, name='support_preact'),
    path('movies/support/support_get_movies_dirty', views.support_get_movies_dirty, name='support_get_movies_dirty'),
    path('movies/support/htmx', views.support_htmx, name='support_htmx'),
    path('movies/support/htmx/search', views.support_search_htmx, name='support_search_htmx'),
    path('movies/support/<str:id>/htmx/delete', views.support_delete_movie_htmx, name='support_delete_movie_htmx'),
    path('movies/support/<str:id>/htmx/save', views.support_save_movie_htmx, name='support_save_movie_htmx'),
    path('movies/support/genres-data', views.support_load_genres, name='support_load_genres'),
    path('movies/support/<str:id>/alpine', views.support_alpine, name='support_alpine'),
    path('movies/support/<str:id>/alpine/save', views.support_save_movie_alpine, name='support_save_movie_alpine'),
    path('movies/support/<str:id>/unpoly', views.support_unpoly, name='support_unpoly'),
    path('movies/support/<str:id>/unpoly/save', views.support_save_movie_unpoly, name='support_save_movie_unpoly'),
    path('movies/support/<str:id>/unpoly/save', views.support_save_movie_unpoly, name='support_save_movie_unpoly'),
    path('movies/hello_world/index', views.hello_world, name='hello_world_index'),
]
