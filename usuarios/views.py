import ast, json, time
from itertools import chain
from datetime import datetime
from .models import Linea
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.utils.dateparse import parse_date
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

@ensure_csrf_cookie
@require_http_methods(['GET'])
def get_lines(request):
    if request.method == 'GET' and 'priv' in request.session:
        try:
            lines = Linea.objects.all()
            serializedLines = serializers.serialize('json', list(lines))
            return JsonResponse({'lineas': serializedLines}, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status = 405)
