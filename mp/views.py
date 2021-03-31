#IMPORTACIONES
from .models import mp
from usuarios.models import Linea
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
# Create your views here.

#INDICE DEL MP
def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

@require_http_methods(['POST'])
@csrf_exempt
def post_mp(request):
    data = request.POST.get('')
    sesLinea = Linea.objects.get(linea__exact=f"{request.session['Linea']}")


