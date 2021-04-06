import ast, json
from datetime import datetime
from django.core import serializers
from django.shortcuts import render
from usuarios.models import Usuarios
from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
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
            return JsonResponse({'maqdia': serializedCronAct}, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
        except Cronograma.DoesNotExist:
            print("No hay maquinas programadas para hoy")
    return HttpResponse(status=405)

#POSTEA LA INFORMACION SOLICITADA
@require_http_methods(['POST', 'GET'])
def _post_tpm_inf(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            print(data)
            maquina = Maquina.objects.get(nombre__exact=data['maquina'])
            for i in range(len(data['nombre'])):
                actividad = Actividades.objects.create(Id = None, nombre = data['nombre'][i], maquinas = maquina,tipo=data['tipo'][i], status=data['status'][i], registro=datetime.now())
            tarjeta = Tarjetas.objects.create()
            return HttpResponse(status=201)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)     
    return HttpResponse(status=405)

@require_http_methods(['POST'])
def _get_act_machine(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('id')
            actividades = Actividades.objects.filter(maquina_id__exact=data)
            serializedAct = serializers.serialize('json', list(actividades))
            return JsonResponse({'actividades': serializedAct}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

#CRONOGRAMA
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

#USUARIOS
@require_http_methods(['GET', 'POST'])
@csrf_exempt
def usuarios(request):
    if request.method == 'GET':
        try:
            serializedUsuarios = {}
            usuarios = Usuarios.objects.all()
            print(len(usuarios))
            serializedUsuarios = {
                "id" : [i.id for i in usuarios],
                "username": [i.username for i in usuarios],
                "email": [i.email for i in usuarios],
                "linea": [i.linea for i in usuarios],
            } 
                
            print(serializedUsuarios)
            return JsonResponse({'usuarios': serializedUsuarios}, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    elif request.method == 'POST':
        try:
            data = request.POST.get('data')
            print(data)
            data = ast.literal_eval(data)
            user = Usuarios.objects.create_superuser(username=data['user'], email=data['email'], password=data['password'], linea=data['linea'])
            serialized = {
                "id": user.id,
                "username": user.username,
                "linea": user.linea,
                "email": user.email
            }
            return JsonResponse({'usuario': serialized}, status=201)
        except Exception as e:
            print(e)
            return JsonResponse({'Error': "Entrada Duplicada: El usuario, correo y/o linea ya han sido registrado :("}, status= 200)
    return HttpResponse(status=405)

    
#ELIMINA USUARIOS
@require_http_methods(['POST'])
@csrf_exempt
def _del_user(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('id')
            user = Usuarios.objects.get(pk=data)
            user.delete()
            return HttpResponse(status = 203)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status = 405)

#MODIFICA USUARIOS EXISTENTES
@require_http_methods(['POST'])
@csrf_exempt
def _modify_user(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data =ast.literal_eval(data) 
            print(data)
            user = Usuarios.objects.get(pk=data['id'])
            user.username = data['user']
            user.password = data['password']
            user.linea = data['linea']
            user.email = data['email']
            user.save()
            print(user)
            return HttpResponse(status=202)
        except Exception as e:
            print(e)
    return HttpResponse(status = 405)

#HISTORIAL
@require_http_methods(['POST'])
@csrf_exempt
def _machine_history(request):
    if request.method == 'POST':
        try:
            machine = request.POST.get('machine')
            hisTarj = Tarjetas.objects.filter(localizacion_id__linea__exact=f"{request.session['Linea']}", maquina_id__nombre__exact=f"{machine}")
            serializedTarj = serializers.serialize('json', list(hisTarj))
            return JsonResponse({'hist': serializedTarj}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
        except Tarjetas.DoesNotExist:
            print("No existen tarjetas todavia")
            return JsonResponse({'Mensaje': "Todavia no existen tarjetas de esta maquina"}, status = 200)
    return HttpResponse(status=405)

#TARJETA ESPECIFICA
@require_http_methods(['POST'])
@csrf_exempt
def _get_machine_card(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            card = Tarjetas.objects.get(Id_exact=f"{data['id']}")
            card = model_to_dict(card)
            serializedCard = json.dumps(card)
            return JsonResponse({'card': serializedCard}, status = 200)
        except Exception as e:
            print(e)
        except Tarjetas.DoesNotExist:
            print("No existe la tarjetas de la maquina")
            return HttpResponse(status = 204)
    return HttpResponse(status =405)

#POST PANEL
