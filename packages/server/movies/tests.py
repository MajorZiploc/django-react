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
    self.user = User.objects.create_user(
        username='user@foo.com', email='user@foo.com', password='top_secret')
    self.view = views.ListCreateMovieAPIView.as_view()

  def test_create_a_movie(self):
    data = {'title': 'Ants', 'genre': 'Action', 'year': 1999}
    request = self.factory.post(reverse('movies:get_post_movies'), data, format='json')
    force_authenticate(request, user=self.user, token=None)
    response: HttpResponse = self.view(request)
    self.assertEqual(response.status_code, 201)
    self.assertEqual(models.Movie.objects.count(), 1)
