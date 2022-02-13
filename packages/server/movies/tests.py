from django.urls.base import reverse
from django.http import HttpResponse
from rest_framework.test import APITestCase, APIClient, force_authenticate, APIRequestFactory
# useful to have this in INSTALLED_APPS in your settings.py for the following import 'rest_framework.authtoken',
# from rest_framework.authtoken.models import Token
from movies import models
from movies import views
from django.contrib.auth.models import User

class MoviesTests(APITestCase):

  def setUp(self):
    self.factory = APIRequestFactory()
    # self.client = APIClient()
    self.user1 = User.objects.create_user(
        username='user@foo.com', email='user@foo.com', password='top_secret')
    self.user2 = User.objects.create_user(
        username='tom@foo.com', email='tom@foo.com', password='top_secret2')
    self.create_view = views.ListCreateMovieAPIView.as_view()
    self.rud_view = views.RetrieveUpdateDestroyMovieAPIView.as_view()

  def test_create_a_movie(self):
    data = {'title': 'Ants', 'genre': 'Action', 'year': 1999}
    request = self.factory.post(reverse('movies:get_post_movies'), data, format='json')
    force_authenticate(request, user=self.user1, token=None)
    response: HttpResponse = self.create_view(request)
    self.assertEqual(response.status_code, 201)
    self.assertEqual(models.Movie.objects.count(), 1)

  def test_update_a_movie_with_put(self):
    movie = models.Movie.objects.create(title='Ants', genre='Action', year=1999, creator=self.user1)
    data = {'title': 'Cats', 'genre': 'Action', 'year': 1999}
    request = self.factory.put(
        path=reverse(
            'movies:get_delete_update_movie',
            args=(
                movie.pk,
            )),
        data=data,
        format='json')
    force_authenticate(request, user=self.user1, token=None)
    response: HttpResponse = self.rud_view(request, pk=movie.pk)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(models.Movie.objects.filter(title='Cats').count(), 1)

  def test_update_a_movie_with_patch(self):
    movie = models.Movie.objects.create(title='Ants', genre='Action', year=1999, creator=self.user1)
    data = {'title': 'Cats'}
    request = self.factory.patch(
        path=reverse(
            'movies:get_delete_update_movie',
            args=(
                movie.pk,
            )),
        data=data,
        format='json')
    force_authenticate(request, user=self.user1, token=None)
    response: HttpResponse = self.rud_view(request, pk=movie.pk)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(models.Movie.objects.filter(title='Cats').count(), 1)

  def test_update_a_movie_with_delete(self):
    movie = models.Movie.objects.create(title='Ants', genre='Action', year=1999, creator=self.user1)
    request = self.factory.delete(
        path=reverse(
            'movies:get_delete_update_movie',
            args=(
                movie.pk,
            )),
        format='json')
    force_authenticate(request, user=self.user1, token=None)
    response: HttpResponse = self.rud_view(request, pk=movie.pk)
    self.assertEqual(response.status_code, 204)
    self.assertEqual(models.Movie.objects.count(), 0)
