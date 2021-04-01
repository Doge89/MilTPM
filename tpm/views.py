from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.

#INDICE 
def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)
