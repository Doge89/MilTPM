import math, requests
from icecream import ic
from django.db.models import Max
from django.shortcuts import render
from django.core.mail import send_mail
from MW.settings import EMAIL_HOST_USER
from datetime import datetime, timedelta
from hxh.models import infoProduccion, infoGeneral
from django.http import HttpResponse, JsonResponse
from usuarios.models import Andon, Linea, Usuarios, AndonHist
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

URL = 'http://10.134.35.11:8000/api/token/verify/'# Create your views here.

#CARGA DEL SISTEMA ANDON
def index(request):
    if ('Usuario' in request.session and 'Pass' in request.session and 'Linea' in request.session and request.session['priv'] == 'production' or request.session['priv'] == 'admin'):
        return render(request, 'index.html', status = 200)
    return HttpResponse(status=401)

@require_http_methods(['POST'])
@csrf_exempt
def start_andon(request):
    if request.method == 'POST':
        try:
            ahora = datetime.now()
            data = request.POST.get('linea')
            #ahora = datetime.strftime('%H:%M:%S')
            request.session['InicioH'] = ahora.hour
            request.session['Inicio'] = f"{ahora}"
            estatus = request.POST.get('razon')
            #MODIFICAR
            if request.session['priv'] != 'admin':
                lineaAct = Linea.objects.get(usuario_id__username__exact=f"{request.session['Usuario']}")
            else:
                lineaAct = Linea.objects.get(linea__exact=f"{data}")
            sisAnd = Andon.objects.create(Id = None, estatus = estatus, linea = lineaAct, registro= datetime.now())
            andHist = AndonHist.objects.create(Id = None, estatus = estatus, linea=lineaAct, registro = datetime.now())
            # sisAnd.linea.add(lineaAct)
            # print(sisAnd.estatus)

            if estatus == "mantenimiento":
                send_mail(f"{request.session['Linea'] if 'Linea' in request.session else data}", "Solicitud de mantenimiento", EMAIL_HOST_USER, ['undertale.9055@gmail.com'], False)

            return HttpResponse(status=201)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

@csrf_exempt
def _start_andon_micro(request):
    if request.method == "POST":
        try:
            linea = request.POST.get('linea')
            status = request.POST.get('tipo')
            if type(linea) and type(status) == str:
                lineaAct = Linea.objects.get(linea__exact=f"{linea}")
                sisAnd = Andon.objects.create(Id = None, estatus = status, linea = lineaAct, registro = datetime.now())
                andHist = AndonHist.objects.create(Id= None, estatus = status, linea = lineaAct, registro = datetime.now())
                print(sisAnd)
                print(andHist)
                return HttpResponse(status = 201)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)
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
            ic(user)
            if request.session['priv'] != 'admin':
                andon = Andon.objects.filter(linea_id__linea__exact=f"{request.session['Linea']}", estatus=f"{razon}").last()
            else:
                andon = Andon.objects.filter(linea_id__linea__exact=f"{linea}", estatus=f"{razon}").last()
            if andon.active == 1 and user.clave == clave:
                andon.active = False
                andon.pause = andon.pause + f"{datetime.now()}" + "\n"
            elif andon.active != 1 and user.clave == clave:
                andon.active = True
                andon.pause = andon.pause + f"{datetime.now()}" + "/" 
            ic(andon.active)
            andon.save()
            return JsonResponse({'Activo': andon.active})
        except Exception as e:
            print(e)
            return HttpResponse(status=401)
    return HttpResponse(status=405)

@require_http_methods(['POST'])
@ensure_csrf_cookie
def finish_andon(request):

    def _get_AndHist(status, linea):
        aH = AndonHist.objects.filter(linea_id__linea__exact=f"{linea}", estatus__exact=f"{status}")
        aH = AndonHist.objects.get(registro__exact=f"{aH.aggregate(Max('registro'))['registro__max']}")
        return aH

    if request.method == 'POST':
        try:
            fin = datetime.now()
            finHr = fin.hour

            estatus = request.POST.get('razon')
            clave = request.POST.get('clave')
            tiempo = request.POST.get('tiempo')
            linea = request.POST.get('linea')
            hrInit = request.POST.get('hrInit')
            ahoraInit = request.POST.get('inicio')
            descrip = request.POST.get('descrip')
            descrip = descrip if descrip != None else ""
            ic(tiempo)
            tiempo = int(tiempo)

            print(ahoraInit)
            if request.session['priv'] != 'admin':
                andAct = Andon.objects.filter(linea_id__linea__exact=f"{request.session['Linea']}", estatus__exact=f"{estatus}").last()
            else: 
                andAct = Andon.objects.filter(linea_id__linea__exact=f"{linea}", estatus__exact=f"{estatus}").last()
            #print(andAct)          
            #print(type(ahoraInit))
            user = Usuarios.objects.get(clave__exact=f"{clave}")
            andHist = _get_AndHist(status=estatus, linea= request.session['Linea'] if 'Linea' in request.session else linea)
            
            ic(user)
            
            if int(hrInit) == finHr and user.clave == clave:
                hora =_calc_time(tiempo)
                #print(hora)
                if request.session['priv'] != 'admin':
                    horProd = infoProduccion.objects.get(info_id__linea_id__linea__exact=f"{request.session['Linea']}", inicio__exact=f"{hrInit}:00:00", fecha__exact=datetime.date(datetime.now()))
                else:
                    horProd = infoProduccion.objects.get(info_id__linea_id__linea__exact=f"{linea}", inicio__exact=f"{hrInit}:00:00", fecha__exact=datetime.date(datetime.now()))
                horProd.comentarios = str(horProd.comentarios) + "\n" + f"{user.dep}: {hora}" + f"\n{descrip}"
                        
                andHist.tiempoM = f"{hora}"
                andHist.descrip = f"{descrip}"
                andHist.finishReg = datetime.now()
                andHist.finishDep = user.dep
                horProd.save()
                andHist.save()
                andAct.delete()
                
            elif int(hrInit) != finHr and user.clave == clave:
                ahoraInit = datetime.strptime(ahoraInit, '%Y/%m/%d %H:%M:%S')
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

                andHist.tiempoM = _calc_time(Tiempo=hora)        
                andHist.descrip = descrip
                andHist.finishReg = datetime.now()
                andHist.finishDep = f"{user.dep}" 
                andHist.save()
                

            return HttpResponse(status=204)
        except Exception as e:
            print(e)
            return HttpResponse(status=401)
    return HttpResponse(status=405)

#SOLO SCRIPT REMOTO DE PYTHON
@csrf_exempt
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


    
