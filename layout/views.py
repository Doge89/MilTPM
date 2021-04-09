from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from usuarios.models import Usuarios, Linea, Andon
from django.views.decorators.http import require_http_methods

# Create your views here.
def index(request):
    return render(request, 'index.html', status=200)

@require_http_methods(['GET'])
def _get_status(request):
    if request.method == 'GET':
        try:
            lineas = Linea.objects.all()
            status = Andon.objects.all()
            serializedStatus = serializers.serialize('json', list(status))
            return JsonResponse({'status': serializedStatus, 'lineas': serializers.serialize('json', list(lineas))}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

