from django.urls import path
from movies import views

app_name = 'movies'
urlpatterns = [
    path('', views.ListCreateMovieAPIView.as_view(), name='get_post_movies'),
    path('<int:pk>/', views.RetrieveUpdateDestroyMovieAPIView.as_view(), name='get_delete_update_movie'),
    path('support/', views.support_page, name='support_page'),
]
