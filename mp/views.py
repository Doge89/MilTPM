#IMPORTACIONES
import ast, json
from .models import mp
from datetime import datetime
from usuarios.models import Linea
from django.shortcuts import render
from django.core import serializers
from django.forms import model_to_dict
from django.utils.dateparse import parse_date
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
# Create your views here.

#INDICE DEL MP
def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session and request.session['priv'] == 'mantenimiento':
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

#POST DE LA INFORMACION DEL MP
@require_http_methods(['POST'])
@csrf_exempt #QUITAR AL MOMENTO DE HACER PRUEBAS
#@ensure_csrf_cookie
def post_mp(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            print(data)
            data = ast.literal_eval(data)
            print(type(data))
            sesLinea = Linea.objects.get(linea__exact=f"{data['linea']}")
            print(sesLinea)
            histMP = mp.objects.create(Id = None, linea = sesLinea, fecha = datetime.now().date(), area = data['tipo'], turno = data['turno'], tecnico = data['tecnicoJefe'], superMTTO = data['superMTTO'], superPRDN = data['superPRDN'], nombre = data['reportadoPor'], hora = datetime.now().strftime('%H:%M:%S'), tipoMaquina = data['tipoMaquina'], tagMaquina = data['tagMaquina'], descripcion = data['decripcion'], tipoFalla = data['tipoFalla'], afecta = data['afectaProduccion'], horaInicio=f"{data['iniciadoEn']}:00", horaFinal=f"{data['terminadoEn']}:00", reparacion=data['arregladoPor'], refacciones=data['refacciones'], causa = data['causa'], tiempoMuerto=f"{data['tiempoMuerto']}:00", validado=data['validadoPor'], tecnicoJefe = data['tecnicoJefe'])
            return HttpResponse(status=201)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status = 405)


#HISTORIAL DEL MP
def historial(request):
    if 'Usuario' in request.session and 'Pass' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

@require_http_methods(['POST'])
@csrf_exempt
#@ensure_csrf_cookie
def _get_mp(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            print(data)
            infMP = mp.objects.filter(fecha__exact=f"{data['fecha']}", turno__exact=f"{data['turno']}", linea_id__linea__exact=f"{data['linea']}")
            serializedMP = serializers.serialize('json', list(infMP))
            print(serializedMP)
            print(type(serializedMP))

            linAct = Linea.objects.get(linea__exact=f"{data['linea']}")
            linAct = model_to_dict(linAct)
            serializedLinea = json.dumps(linAct)
            return JsonResponse({'infMP': serializedMP, 'Linea': serializedLinea })
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status = 405)


