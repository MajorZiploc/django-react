from datetime import timedelta
import json
from django.http import HttpRequest, HttpResponseBadRequest, JsonResponse
from django.utils.timezone import now
import requests
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from django.shortcuts import get_object_or_404, redirect, render, resolve_url
from rest_framework.views import APIView
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
from integrations.forms import GenreForm

class ListCreateMovieAPIView(ListCreateAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MovieFilter

    def perform_create(self, serializer):
        # Assign the user who created the movie
        serializer.save(creator=self.request.user)

class RetrieveUpdateDestroyMovieAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

# NOTE: authorize_user to 403 non logged in django users
# @authorize_user
# This one for django admin users
# @login_required
def support_page(request, id):
    return render(request, 'integrations/preact_ex.html', context=dict(
        movie_id=id,
        meta_data=[{'snack': 'popcorn'}]
    ))

class MovieFilterDataAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: HttpRequest):
        return JsonResponse({'data': {
            'genres': ['kids', 'action']
        }})

class ListMovieAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: HttpRequest):
        # request_body = parse_request_body(request.body)
        # response = requests.get(f'{base_url}/all')
        response = {'status_code': 200, 'data': ["stuff1", "stuff2"]}
        if response['status_code'] == 200:
            # data = response.json()
            data = response['data']
        else:
            print(f"Error: {response['status_code']} - {response['text']}")

    def post(self, request: HttpRequest):
        print('list_movies_post')
        query_param1 = request.GET.get('query_param1', None)
        # print('query_param1')
        # print(query_param1)
        request_body = parse_request_body(request.body)
        request_body['query_param1'] = query_param1
        # NOTE: statuses
        # status.HTTP_400_BAD_REQUEST
        # status.HTTP_200_OK
        # status.HTTP_201_CREATED
        # status.HTTP_202_ACCEPTED
        # status.HTTP_204_NO_CONTENT # good for DELETE
        # NOTE: to return an explicit status
        # return JsonResponse(request_body, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(request_body)

    def patch(self, request: HttpRequest):
        print('list_movies_patch')
        request_body = parse_request_body(request.body)
        return JsonResponse(request_body)

    def delete(self, request: HttpRequest):
        print('list_movies_delete')
        request_body = parse_request_body(request.body)
        return JsonResponse(request_body)

def redis_entry_create():
    cache = REDIS_CLIENT
    cache_key = "yogurt"
    data_to_cache = {
        "stuff1": 'hi stuff1',
        "stuff2": ['hi', 'stuff2'],
        "stuff3": {
            'greet': 'hi',
            'things': ['stuff3', 'stuff3s_cat']
        },
    }
    cache_value = cache.get(cache_key)
    print('cache_value should be None because it was not set yet or is expired:')
    print(cache_value)
    # Set the value in the cache with expiration time and milliseconds parameter
    # ex=1800 = expires in 1800 seconds (30 minutes)
    cache.set(cache_key, json.dumps(data_to_cache), ex=1800)
    cache_value = cache.get(cache_key)
    cache_data = json.loads(cache_value.decode())
    print('cache_data')
    print(cache_data)

def redis_entry_delete():
    cache = REDIS_CLIENT
    cache_key = "yogurt"
    cache.delete(cache_key)

def task_eager():
    # FIRE EVENT EXAMPLE
    # logs should appear in the beat worker
    test_task.apply_async(queue='crud_api_default_queue')

def task_scheduled():
    # will be scheduled by integrations/tasks/tasks.py.schedule_jobs() which
    # is called on intervals and other configs based on
    # api_crud/celeryconfig.py.beat_schedule['schedule_jobs']
    ScheduledJob.objects.create(
        job_type='test_task',
        next_scheduled=now() +
        timedelta(
            seconds=30),
        delay_seconds=20,
        job_info={
            'stuff1': 'this dict will be passed as kwargs to test_task for custom behavior',
            'x': [
                1,
                2,
                3],
            'y': {
                'z': 1}},
        delete_after_count=2,
    )

def get_movies_dirty(request):
    return JsonResponse(dict(
        movies=[m.to_json_dict() for m in Movie.objects.all()]
    ))


def config_store_main(request):
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
    return render(request, 'integrations/config_store_main.html', context=dict(
        movies=movies,
        genres=genres
    ))

@require_http_methods(['DELETE'])
def delete_movie(request, id):
    # Movie.objects.filter(id=id).delete()
    movies = Movie.objects.all()
    return HttpResponseBadRequest("Bad Request: Some condition not met")
    # return render(request, 'integrations/movies_list.html', {'movies': movies})

@require_http_methods(['POST'])
def save_movie(request, id):
    movie = Movie.objects.filter(id=id).first()
    if not movie:
        return HttpResponseBadRequest("Movie not found")
    # print('request.GET')
    # print(request.GET)
    # query_param1 = request.GET.get('query_param1', None)
    # print('query_param1')
    # print(query_param1)
    form = GenreForm(request.POST)
    if form.is_valid():
        print('form.data')
        print(form.data)
        movie.genre = form.data['genre']
        movie.save()
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
        return render(request, 'integrations/movies_list.html', {'movies': movies, 'genres': genres})
    return HttpResponseBadRequest("Bad Request: Some condition not met")

@require_http_methods(['GET'])
def load_genres(request):
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
