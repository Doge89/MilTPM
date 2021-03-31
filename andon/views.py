import math
from datetime import datetime, timedelta
from django.shortcuts import render
from usuarios.models import Andon, Linea, Usuarios, AndonHist
from hxh.models import infoProduccion, infoGeneral
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

# Create your views here.

#CARGA DEL SISTEMA ANDON
def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

@require_http_methods(['POST'])
#@ensure_csrf_cookie
@csrf_exempt
def start_andon(request):
    if request.method == 'POST':
        ahora = datetime.now()
        #ahora = datetime.strftime('%H:%M:%S')
        request.session['InicioH'] = ahora.hour
        request.session['Inicio'] = ahora
        print(request.session['Inicio'])
        estatus = request.POST.get('razon')
        print(estatus)
        lineaAct = Linea.objects.get(usuario_id__username__exact=f"{request.session['Usuario']}")
        sisAnd = Andon.objects.create(Id = None, estatus = estatus, linea = lineaAct)
        andHist = AndonHist.objects.create(Id = None, estatus = estatus, linea=lineaAct, registro = datetime.now())
        # sisAnd.linea.add(lineaAct)
        # print(sisAnd.estatus)
        return HttpResponse(status=201)
    return HttpResponse(status=405)

@require_http_methods(['POST'])
@csrf_exempt
def finish_andon(request):
    if request.method == 'POST':
        try:
            ahora = datetime.now()
            fin = ahora.hour
            estatus = request.POST.get('razon')
            clave = request.POST.get('clave')
            tiempo = request.POST.get('tiempo')
            tiempo = int(tiempo)
            print(tiempo)
            print("%s %s" % (estatus,clave))
            
            andAct = Andon.objects.filter(linea_id__linea__exact=f"{request.session['Linea']}", estatus__exact=f"{estatus}").last()
            print(andAct)
            andAct.delete()

            #ASIGNACION DEL TIEMPO MUERTO
            if request.session['InicioH'] == fin:
                hora =_calc_time(tiempo)
                print(hora)
                horProd = infoProduccion.objects.get(info_id__linea_id__linea__exact=f"{request.session['Linea']}", inicio__exact=f"{request.session['InicioH']}:00:00")
                horProd.comentarios = str(horProd.comentarios) + "\n" + hora
                horProd.save()
            else:
                ahora = request.session['Inicio']
                tiempo = timedelta(seconds=tiempo)
                tmMidl = timedelta(hours=fin.hour)
                tmInit = timedelta(hours=ahora.hour, minutes=ahora.minute, seconds=ahora.second)
                tmFin = timedelta(hours=fin.hour, minutes=fin.minute, seconds=fin.second)
                t1 = tmMidl - tmInit
                t2 = tmFin - tmMidl
                print("%s %s %s" (tiempo, tmInit, tmFin))
                hrProduccion1 = infoProduccion.objects.get(inicio__exact=f"{ahora.hour}:00:00", info_id__linea_id__linea__exact=f"{request.session['Linea']}")
                hrProduccion1.comentarios = hrProduccion1.comentarios + "\n" + str(t1)
                hrProduccion1.save()
                hrProduccion2 = infoProduccion.objects.get(inicio__exact=f"{fin.hour}:00:00", info_id__linea_id__linea__exact=f"{request.session['Linea']}")
                hrProduccion2.comentarios = hrProduccion2.comentarios + "\n" + str(t2)
                hrProduccion2.save()                
                

            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

def _calc_time(Tiempo = None):
    hh = math.floor(Tiempo/3600)
    mm = math.floor((Tiempo - (hh * 3600))/60)
    ss = Tiempo - (hh * 3600) - (mm * 60)

    hora = ""

    if hh < 10:
        hh = "0"+str(hh)
    if mm < 10:
        mm = "0"+str(mm)
    if ss < 10:
        ss = "0"+str(ss)
    
    hora = f'{hh}:{mm}:{ss}'

    return hora
    
