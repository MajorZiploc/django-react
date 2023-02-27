from django.http import HttpResponse
from functools import wraps

def authorize_user(wrapped):
  @wraps(wrapped)
  def wrapper(request, *args, **kwargs):
    print(request.user)
    if request.user is not None and str(request.user) != 'AnonymousUser':
      print(request.user)
      response = wrapped(request, *args, **kwargs)
      response.authorized = True
      return response
    return HttpResponse(status=403)
  return wrapper
