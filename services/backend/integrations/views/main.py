from datetime import timedelta
import json
from django.http import HttpRequest, HttpResponseBadRequest, JsonResponse
from rest_framework.request import Request
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

def hello_world(request):
    return render(request, 'integrations/hello_world.html', {})

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

class MovieFilterDataAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        return JsonResponse({'data': {
            'genres': ['kids', 'action']
        }})

class ListMovieAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        # request_body = parse_request_body(request.body)
        # response = requests.get(f'{base_url}/all')
        response = {'status_code': 200, 'data': ["stuff1", "stuff2"]}
        if response['status_code'] == 200:
            # data = response.json()
            data = response['data']
        else:
            print(f"Error: {response['status_code']} - {response['text']}")

    def post(self, request: Request):
        print('list_movies_post')
        # NOTE: request.GET if request: HttpRequest
        query_param1 = request.query_params.get('query_param1', None)
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

    def patch(self, request: Request):
        print('list_movies_patch')
        request_body = parse_request_body(request.body)
        return JsonResponse(request_body)

    def delete(self, request: Request):
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
