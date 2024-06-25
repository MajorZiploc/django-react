from datetime import time, timedelta
import time as timeit
import json
from django.http import HttpRequest, HttpResponse, HttpResponseBadRequest, JsonResponse
from django.urls import reverse
from django.utils.timezone import now
import requests
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from django.shortcuts import get_object_or_404, redirect, render, resolve_url
from rest_framework.views import APIView, status
from integrations.models import Movie, ScheduledJob
from integrations.permissions import IsOwnerOrReadOnly
from integrations.serializers import MovieSerializer
from integrations.pagination import CustomPagination
from integrations.filters import MovieFilter
from integrations.tasks import test_task
from integrations.utils import parse_request_body, get_data_from_endpoint, post_data_to_endpoint, patch_data_to_endpoint, delete_data_from_endpoint, exec_sql_to_dicts
from api_crud.authorization_decorators import authorize_user
from django.contrib.auth.decorators import login_required
from api_crud.settings.base import REDIS_CLIENT
from django.views.decorators.http import require_http_methods
from integrations.forms import GenreForm, MovieForm

# NOTE: authorize_user to 403 non logged in django users
# @authorize_user
# This one for django admin users
# @login_required
def support_preact(request, id):
    return render(request, 'integrations/support_preact.html', context=dict(
        movie_id=id,
        meta_data=[{'snack': 'popcorn'}]
    ))

def support_get_movies_dirty(request):
    return JsonResponse(dict(
        movies=[m.to_json_dict() for m in Movie.objects.all()]
    ))


def support_htmx(request):
    movies = Movie.objects.all()
    genres = [
        {
            "label": "Kids",
            "id": "Kids",
        },
        {
            "label": "Adults",
            "id": "Adults",
        }
    ]
    return render(request, 'integrations/support_htmx.html', context=dict(
        movies=movies,
        genres=genres
    ))

@require_http_methods(['DELETE'])
def support_delete_movie_htmx(request, id):
    Movie.objects.filter(id=id).delete()
    movies = Movie.objects.all()
    return render(request, 'integrations/support_movies_list_htmx.html', {'movies': movies})

@require_http_methods(['POST'])
def support_save_movie_htmx(request, id):
    movie = Movie.objects.filter(id=id).first()
    if not movie:
        return HttpResponseBadRequest("Movie not found")
    # print('request.GET')
    # print(request.GET)
    # query_param1 = request.GET.get('query_param1', None)
    # print('query_param1')
    # print(query_param1)
    form = GenreForm(request.POST)
    print('form.data')
    print(form.data)
    if form.is_valid():
        forloop = {}
        movie.genre = form.data['genre']
        forloop['counter'] = form.data['forloop_counter']
        movie.save()
        genres = [
            {
                "label": "Kids",
                "id": "Kids",
            },
            {
                "label": "Adults",
                "id": "Adults",
            }
        ]
        return render(request, 'integrations/support_movie_htmx.html',
                      {'movie': movie, 'genres': genres, 'forloop': forloop})
    return HttpResponseBadRequest("Bad Request: Some condition not met")

@require_http_methods(['GET'])
def support_search_htmx(request):
    print(request.GET)
    q = request.GET.get('q', None)
    timeit.sleep(3)
    return HttpResponse(f"<div id='search-results'>you searched for: {q}</div>")

@require_http_methods(['POST'])
def support_save_movie_alpine(request, id):
    movie = Movie.objects.filter(id=id).first()
    if not movie:
        return JsonResponse({'message': 'Movie not found!'}, status=status.HTTP_400_BAD_REQUEST)
    print(request.body)
    request_body = parse_request_body(request.body)
    print(request_body)
    movie.title = request_body['title']
    movie.genre = request_body['genre']
    movie.year = request_body['year']
    movie.save()
    return JsonResponse(data={'message': 'im here', 'title': 'yo dog'})

@require_http_methods(['GET'])
def support_load_genres(request):
    genres = [
        {
            "label": "Kids2",
            "id": "Kids",
        },
        {
            "label": "Adults2",
            "id": "Adults",
        }
    ]
    return JsonResponse({'genres': genres})

def support_alpine(request, id):
    movie = Movie.objects.filter(id=id).first()
    if not movie:
        return HttpResponseBadRequest("Movie not found")
    print(movie.to_json_dict())
    return render(request, 'integrations/support_alpine.html', context=dict(
        movie=movie,
        meta_data=[{'snack': 'popcorn'}]
    ))
