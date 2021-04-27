import ast, json, time
from itertools import chain
from datetime import datetime
from .models import infoGeneral, infoProduccion
from usuarios.models import Usuarios, Linea, Andon
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.utils.dateparse import parse_date
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

# Create your views here.

def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session and request.session['priv'] == 'production' or request.session['priv'] == 'admin':
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

#OBTIENE LA INFORMACION PARA REFLEJARLA EN LA PAGINA (HXH)
@require_http_methods(['GET'])
def get(request, linea = None):
    if request.method == 'GET':
        try:
            line = None
            if "Linea" in request.session: line = request.session['Linea'] 
            else: line = linea
            if line == 'none' or line is None: return HttpResponse(status=400)
            #print('a')
            print(line)
            lineaProd = Linea.objects.get(linea__exact=f"{line}")
            user = Usuarios.objects.get(pk=f"{lineaProd.usuario_id}")
            if len(infoProduccion.objects.filter(info_id__linea__linea__exact=f"{line}", fecha__exact=datetime.date(datetime.now()))) == 0:
                #print('b')
                #MODIFICAR
                linUser = None
                print("---------------------")
                if request.session['priv'] == "admin":
                    linUser = Linea.objects.get(usuario_id__id__exact=f"{lineaProd.usuario_id}")
                    print(user.username)
                    #linUser = Linea.objects.get(usuario_id__username__exact=f"{user}")
                else:
                    
                    linUser = Linea.objects.get(usuario_id__username__exact=f"{request.session['Usuario']}")
                    
                dataInfGeneral = infoGeneral.objects.create(Id = None, linea = linUser, consola = '', job='', mod='')
                general = infoGeneral.objects.last()
                print("NO EXISTEN REGISTROS")
                print("CREANDO REGISTROS...") 
                time.sleep(1)

                for x in range(24):
                    if x == 23:
                        datosInfProd = infoProduccion.objects.create(Id = None, inicio=f'{x}:00:00', final=f'00:00:00', plan=0, actual=0, diferencia=0, tiempoMuerto='', codigo='', cantidad='', descripcion='', contramedida='', comentarios='', turno='', info = general, fecha=datetime.date(datetime.now()))
                    else:
                        datosInfProd = infoProduccion.objects.create(Id = None, inicio=f'{x}:00:00', final=f'{x+1}:00:00', plan=0, actual=0, diferencia=0, tiempoMuerto='', codigo='', cantidad='', descripcion='', contramedida='', comentarios='', turno='', info = general, fecha=datetime.date(datetime.now()))
            #MODIFICAR
            datosInfProd = _get_objects(Linea = f"{line}")
            serializedInfProd = serializers.serialize('json', list(datosInfProd))

            #MODIFICAR
            datInfGen = infoGeneral.objects.filter(linea_id__linea__exact=f"{line}").last()
            datLinea = None
            if request.session['priv'] != 'admin':
                datLinea = Linea.objects.get(usuario_id__username__exact=f"{request.session['Usuario']}")
            else:
                datLinea = Linea.objects.get(usuario_id__id__exact=f"{user.id}")
            datInfGen = model_to_dict(datInfGen)

            serializedInfGen = json.dumps(datInfGen)
            datLinea = model_to_dict(datLinea)
            serializedLinea = json.dumps(datLinea)
            # print(serializedInfProd)
            # print(serializedInfGen)
            # print(serializedLinea)
            try:
                if request.session['priv'] != 'admin':
                    andon = Andon.objects.filter(linea_id__linea__exact=f"{request.session['Linea']}")
                else:
                    andon = Andon.objects.filter(linea_id__linea__exact=f"{line}")
                serializedAndon = serializers.serialize('json', list(andon))
            except Exception as e:
                print(e)
                return HttpResponse(status=500)
            except Andon.DoesNotExist:
                print("NO EXISTEN REGISTROS EN LA LINEA")
                return HttpResponse(status=200)
            return JsonResponse({'InfProd':serializedInfProd, 'InfGen': serializedInfGen, 'Linea': serializedLinea, 'Andon': serializedAndon}, status = 200)
        except Exception as e:
            print(e)
        #return HttpResponse(status=200)
    return HttpResponse(status=401)

#ACTUALIZA LA INFORMACION EN LA BD
@require_http_methods(['POST'])
@ensure_csrf_cookie
def post(request, linea = None):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            print(data)
            dataProd = _get_objects(Linea = data['linea'])
            general = infoGeneral.objects.last()
            j = 0
            for i in dataProd:
                i.plan = data['plan'][j]
                i.actual = data['actual'][j]
                i.diferencia = data['diferencia'][j]
                i.tiempoMuerto = data['tiempoMuerto'][j]
                i.codigo = data['codigo'][j]
                i.cantidad = data['cantidad'][j]
                i.descripcion = data['descripcion'][j]
                i.contramedida = data['contramedida'][j]
                i.comentarios = data['comentario'][j]
                i.save()
                j += 1
            general.faltas = data['faltas']
            general.incidencias = data['incidencias']
            general.consola = data['consola']
            general.bajas = data['bajas']
            general.job = data['job']
            general.mod = data['mod']
            general.entrenamiento = data['entrenamiento']
            general.save()
        except Exception as e:
            print(e)
        return HttpResponse(status=201)
    return HttpResponse(status = 401)

@require_http_methods(['GET'])
def _get_actual(request, linea = None):
    if request.method == 'GET':
        try:
            #actual = None
            if request.session['priv'] != 'admin': 
                actual = infoProduccion.objects.get(fecha__exact=datetime.date(datetime.now()), inicio__exact=f"{datetime.now().hour}:00:00", info_id__linea_id__linea__exact=f"{request.session['Linea']}")
            else:
                actual = infoProduccion.objects.get(fecha__exact=datetime.date(datetime.now()), inicio__exact=f"{datetime.now().hour}:00:00", info_id__linea_id__linea__exact=f"{linea}")
            print(actual.actual)
            return JsonResponse({'actual': actual.actual})
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)
@require_http_methods(['GET'])
def historial(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

@require_http_methods(['POST'])
@ensure_csrf_cookie
def historial_get(request):
    if request.method == 'POST':
        fecha = request.POST.get('fecha')
        print(fecha)
        dataProd = infoProduccion.objects.filter(fecha__exact=parse_date(f'{fecha}'), info_id__linea_id__linea__exact=f"{request.session['Linea']}")
        dataGen = infoGeneral.objects.filter(linea_id__linea__exact=f"{request.session['Linea']}").last()
        dataLinea = Linea.objects.filter(usuario_id__username__exact=f"{request.session['Usuario']}")
        serializedData = serializers.serialize('json', list(dataProd))
        serializedDataGen = json.dumps(model_to_dict(dataGen))
        serializedDataLinea = serializers.serialize('json', list(dataLinea))
        
        return JsonResponse({'InfProd': serializedData, 'InfGen': serializedDataGen, 'Linea': serializedDataLinea}, status = 200)
    return HttpResponse(status=405)

@require_http_methods(['POST'])
@csrf_exempt
def _actual_pieces(request, linea=None):
    if request.method == 'POST':
        try:
            data = request.POST.get('value')
            print(data)
            ahora = datetime.now()
            linea = infoProduccion.objects.filter(info_id__linea_id__linea__exact=f"{linea}", inicio__exact=f"{ahora.hour}:00:00").last()
            print(linea)
            linea.actual = data
            linea.save()
            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)
 
#METODOS SIN VISTAS 
def _get_objects(Linea = None):
    #print(Linea)
    ahora = datetime.now()
    if ahora.hour >= 6 and ahora.hour < 15:
        datosInfProd = infoProduccion.objects.filter(inicio__range=('06:00:00','15:00:00'), fecha__exact=datetime.date(datetime.now()), info_id__linea__linea__exact=f'{Linea}')
    elif ahora.hour >= 15 and ahora.hour < 23:
        datosInfProd = infoProduccion.objects.filter(inicio__range=('15:00:00','23:00:00'), fecha__exact=datetime.date(datetime.now()), info_id__linea__linea__exact=f'{Linea}')
    elif ahora.hour == 23 or ahora.hour < 6:
        datosInfProd = infoProduccion.objects.filter(inicio__range=('23:00:00','06:00:00'), fecha__exact=datetime.date(datetime.now()), info_id__linea__linea__exact=f'{Linea}')
    #print(datosInfProd)
    return datosInfProd