import ast, json
from datetime import datetime
from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Cronograma, Tarjetas, Maquina, Actividades
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
# Create your views here.

#INDICE 
def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

#OBTIENE LA INFORMACION PARA SER MOSTRADA EN EL PANEL DEL TPM 
@require_http_methods(['GET'])
def _get_panel_inf(request):
    if request.method == 'GET':
        try:
            dia = datetime.now().weekday()
            cronAct = Cronograma.objects.filter(dia__exact=dia)
            serializedCronAct = serializers.serialize('json', list(cronAct))
            print(dia)
            return JsonResponse({'MaqDia': serializedCronAct}, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
        except Cronograma.DoesNotExist:
            print("No hay maquinas programadas para hoy")
    return HttpResponse(status=405)

#POSTEA LA INFORMACION SOLICITADA
@require_http_methods(['POST'])
def _post_tpm_inf(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            print(data)

            for i in range(len(data['nombre'])):
                pass
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

@require_http_methods(['GET', 'POST'])
@csrf_exempt
def cronograma(request):
    if request.method == 'GET':
        try:
            Maquinas = Maquina.objects.all()
            cronograma = Cronograma.objects.all()
            serializedMaquinas = serializers.serialize('json', list(Maquinas))
            serializedCronograma = serializers.serialize('json', list(cronograma))
            print(serializedMaquinas)
            print(serializedCronograma)
            return JsonResponse({'maquinas': serializedMaquinas, "cronograma": serializedCronograma}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    elif request.method == 'POST':
        try:
            maquina = request.POST.get('data')
            maquina = ast.literal_eval(maquina)
            maquinaAct = Maquina.objects.get(pk = f"{maquina['maquina']}")
            print(maquina)
            if len(Cronograma.objects.filter(dia__exact=maquina['dia'], maquina_id__exact= maquinaAct.Id)[:1]) == 0:
                cronMaquina = Cronograma.objects.create(Id = None, maquina = maquinaAct, dia = maquina['dia'])
                return HttpResponse(status = 201)
            else:
                print("REGISTRO EXISTENTE")
                return HttpResponse(status = 400)
            print(cronMaquina)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

@require_http_methods(['POST'])
@csrf_exempt
def cronograma_delete(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            diaMaquina = Cronograma.objects.get(dia__exact=data['dia'], maquina_id__exact=data['maquina']['id'])
            diaMaquina.delete()
            return HttpResponse(status=203)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

