import math, requests
from datetime import datetime, timedelta
from django.shortcuts import render
from usuarios.models import Andon, Linea, Usuarios, AndonHist
from hxh.models import infoProduccion, infoGeneral
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

URL = 'http://192.168.100.22:8000/api/token/verify/'
# Create your views here.

#CARGA DEL SISTEMA ANDON
def index(request):
    if ('Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session and request.session['priv'] == 'production' or request.session['priv'] == 'admin'):
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

@require_http_methods(['POST'])
@ensure_csrf_cookie
def start_andon(request):
    if request.method == 'POST':
        try:
            ahora = datetime.now()
            data = request.POST.get('linea')
            #ahora = datetime.strftime('%H:%M:%S')
            request.session['InicioH'] = ahora.hour
            print(request.session['InicioH'])
            request.session['Inicio'] = f"{ahora}"
            print(type(request.session['Inicio']))
            estatus = request.POST.get('razon')
            print(estatus)
            #MODIFICAR
            if request.session['priv'] != 'admin':
                lineaAct = Linea.objects.get(usuario_id__username__exact=f"{request.session['Usuario']}")
            else:
                lineaAct = Linea.objects.get(usuario_id__username__exact=f"{data}")
            sisAnd = Andon.objects.create(Id = None, estatus = estatus, linea = lineaAct, registro= datetime.now())
            andHist = AndonHist.objects.create(Id = None, estatus = estatus, linea=lineaAct, registro = datetime.now())
            # sisAnd.linea.add(lineaAct)
            # print(sisAnd.estatus)
            return HttpResponse(status=201)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

#SUJETO A CAMBIOS
@require_http_methods(['POST'])
@ensure_csrf_cookie
def _pause_andon(request):
    if request.method == 'POST':
        try:
            razon = request.POST.get('razon')
            clave = request.POST.get('clave')
            linea = request.POST.get('linea')
            user = Usuarios.objects.get(clave__exact=f"{clave}")
            if request.session['priv'] != 'admin':
                andon = Andon.objects.get(linea_id__linea__exact=f"{request.session['Linea']}", estatus=f"{razon}")
            else:
                andon = Andon.objects.get(linea_id__linea__exact=f"{linea}", estatus=f"{razon}")
            if andon.active == 1 and user.clave == clave:
                andon.active = False
                andon.pause = andon.pause + f"{datetime.now()}" + "\n"
            elif andon.active != 1 and user.clave == clave:
                andon.active = True
                andon.pause = andon.pause + f"{datetime.now()}" + "/" 
            andon.save()
            return JsonResponse({'Activo': andon.active})
        except Exception as e:
            print(e)
            return HttpResponse(status=401)
    return HttpResponse(status=405)

@require_http_methods(['POST'])
@ensure_csrf_cookie
def finish_andon(request):
    if request.method == 'POST':
        try:
            fin = datetime.now()
            finHr = fin.hour
            estatus = request.POST.get('razon')
            clave = request.POST.get('clave')
            tiempo = request.POST.get('tiempo')
            linea = request.POST.get('linea')
            tiempo = int(tiempo)
            #print(tiempo)
            #print("%s %s" % (estatus,clave))

            hrInit = request.session['InicioH']
            print(hrInit)
            if request.session['priv'] != 'admin':

                andAct = Andon.objects.filter(linea_id__linea__exact=f"{request.session['Linea']}", estatus__exact=f"{estatus}").last()
            else: 
                andAct = Andon.objects.filter(linea_id__linea__exact=f"{linea}", estatus__exact=f"{estatus}").last()
            #print(andAct)
            
            ahoraInit = request.session['Inicio']
            #print(type(ahoraInit))
            user = Usuarios.objects.get(clave__exact=f"{clave}")

            #ASIGNACION DEL TIEMPO MUERTO
            if hrInit == finHr and user.clave == clave:
                hora =_calc_time(tiempo)
                #print(hora)
                if request.session['priv'] != 'admin':
                    horProd = infoProduccion.objects.get(info_id__linea_id__linea__exact=f"{request.session['Linea']}", inicio__exact=f"{hrInit}:00:00", fecha__exact=datetime.date(datetime.now()))
                else:
                    horProd = infoProduccion.objects.get(info_id__linea_id__linea__exact=f"{linea}", inicio__exact=f"{hrInit}:00:00", fecha__exact=datetime.date(datetime.now()))
                horProd.comentarios = str(horProd.comentarios) + "\n" + f"{estatus}: {hora}"
                horProd.save()
                andAct.delete()
            elif hrInit != finHr and user.clave == clave:
                ahoraInit = datetime.strptime(ahoraInit, '%Y-%m-%d %H:%M:%S.%f')
                # print(ahoraInit)
                # print(fin)
                # print(finHr)

                deltaFin = timedelta(hours=fin.hour, minutes=fin.minute, seconds=fin.second)
                deltaInt = timedelta(hours=fin.hour)
                deltaInit = timedelta(hours=ahoraInit.hour, minutes=ahoraInit.minute, seconds=ahoraInit.second)
                print(deltaInit, deltaInt, deltaFin)

                t1 = deltaFin - deltaInt
                t2 = deltaInt - deltaInit
                print(t1, t2)

                # print("%s %s %s" (tiempo, tmInit, tmFin))
                if request.session['priv'] != 'admin':
                    hrProduccion1 = infoProduccion.objects.filter(inicio__exact=f"{ahoraInit.hour}:00:00", info_id__linea_id__linea__exact=f"{request.session['Linea']}").last()
                else:
                    hrProduccion1 = infoProduccion.objects.filter(inicio__exact=f"{ahoraInit.hour}:00:00", info_id__linea_id__linea__exact=f"{linea}").last()
                hrProduccion1.comentarios = hrProduccion1.comentarios + "\n" + f"{estatus}: " + str(t2)
                hrProduccion1.save()
                if request.session['priv'] != 'admin':
                    hrProduccion2 = infoProduccion.objects.filter(inicio__exact=f"{fin.hour}:00:00", info_id__linea_id__linea__exact=f"{request.session['Linea']}").last()
                else:
                    hrProduccion2 = infoProduccion.objects.filter(inicio__exact=f"{fin.hour}:00:00", info_id__linea_id__linea__exact=f"{linea}").last()
                hrProduccion2.comentarios = hrProduccion2.comentarios + "\n" + f"{estatus}: " + str(t1)
                hrProduccion2.save()  
                andAct.delete()            
                

            return HttpResponse(status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=401)
    return HttpResponse(status=405)

#SOLO SCRIPT REMOTO DE PYTHON
@require_http_methods(['GET'])
def _get_status(request, linea = None):
    if request.method == 'GET':
        try:
            print(linea)
            status = Andon.objects.filter(linea_id__linea__exact=f"{linea}")
            return JsonResponse({'andon': [i.estatus for i in status]}, status = 200)
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


    
