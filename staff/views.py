import ast

from usuarios.models import *
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status = 401)