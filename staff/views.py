import ast

from icecream import ic
from hxh.models import *
from usuarios.models import *
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
# Create your views here.

def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session:
        return render(request, 'index.html', status = 200)
    return HttpResponse(status = 401)

@require_http_methods(['GET'])
def get_all_staff(request):
    if request.method == "GET":
        try:
            data = Staff.objects.all()
            ic([i.key for i in data])
            return JsonResponse({'key': [i.key for i in data], 'name': [i.name for i in data]}, status = 200)
        except Staff.DoesNotExist:
            print("NO EXISTEN USUARIOS EN LA BD")
            return HttpResponse(status = 204)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)

@require_http_methods(['GET'])
def get_staff_line(request, linea = None):
    if request.method == "GET":
        try:
            if type(linea) == str or 'Linea' in request.session:
                if len(Staff.objects.all()) != 0:
                    memberStaff = Staff.objects.all()
                    return JsonResponse({'key': [i.key for i in memberStaff], "name": [i.name for i in memberStaff], "is_active": [i.is_active for i in memberStaff]}, status = 200)
                print("NO EXISTEN USUARIOS")
                return JsonResponse({"message": "No existen usuarios en el servidor"},status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)

@require_http_methods(['POST'])
@ensure_csrf_cookie
def create_user(request):
    if request.method == "POST":
        data = request.POST.get("data")
        ic(data)
        data = ast.literal_eval(data)
        try:
            if Staff.objects.get(key__exact = f"{data['key']}"):
                raise Exception("Ya existe un usuario con esa llave, intente con otra")
        except Staff.DoesNotExist:
            ic("Creando Usuario...")
            newUser = Staff.objects.create(Id = None, key = data['key'], name = data['name'], is_active = True, register = datetime.now())
            return JsonResponse({'user': newUser.name}, status = 201)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)

@require_http_methods(['GET','POST'])
@ensure_csrf_cookie
def manage_users(request, linea = None):
    """
        Manage the users system
        If method is GET, returns all the users in,
        else if is POST, create a record to notice the users begin turn
    """
    if request.method == "GET":
        try:
            if type(linea) == str and linea != "":
                workers = Staff.objects.filter(linea_id__linea__exact=f"{request.session['Linea'] if 'Linea' in request.session else linea}")
                staffLine = SignUp.objects.filter(linea_id__linea__exact = f"{request.session['Linea'] if 'Linea' in request.session else linea}", fecha__exact=f"{datetime.date(datetime.now())}", hora__range=__getHourRange())
                return JsonResponse({'name': [i.user.name for i in staffLine], 'date': [i.fecha for i in staffLine], 'time': [i.hora for i in staffLine], 'workers': len([i.status for i in workers if i.status == 'IN'])})
        except SignUp.DoesNotExist:
            print("NO EXISTEN ENTRADAS")
            return HttpResponse(status = 204)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)

    elif request.method == "POST":
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            if data:
                try:
                    
                    staffUser = Staff.objects.get(key__exact=f"{data['key']}")
                    staffLine = Linea.objects.get(linea__exact=f"{data['linea']}")
                    productionInfo = infoProduccion.objects.get(info_id__linea_id__linea__exact=f"{request.session['Linea'] if 'Linea' in request.session else data['linea']}", fecha__exact=f"{datetime.date(datetime.now())}", inicio__exact=f"{datetime.now().hour}:00:00")
                    
                    ic(staffLine)
                    hour = datetime.strftime(datetime.now(), "%H:%M:%S")
                    if staffUser.status == "OFF":
                        newEntrance = SignUp.objects.create(Id = None, fecha = datetime.date(datetime.now()), hora = f"{hour}", linea = staffLine, user = staffUser)
                        staffUser.status = "IN"
                        history = History.objects.create(Id = None, user = staffUser, linea = staffLine, status = staffUser.status, registro = datetime.now())
                        staffUser.linea = staffLine
                        staffUser.save()
                        workers = __changeWorkers(staffUser.status, productionInfo, request.session['Linea'] if 'Linea' in request.session else data['linea'])
                        return JsonResponse({'date': newEntrance.fecha, "hour": newEntrance.hora, 'workers': workers}, status = 200)
                    raise Exception("Tiene que marcar una salida primero")
                except Staff.DoesNotExist:
                    print("NO EXISTE USUARIO CON ESA LLAVE")
                    return HttpResponse(status = 204)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)

@require_http_methods(['GET', 'POST'])
@ensure_csrf_cookie
def manage_exit_users(request, linea = None):
    """
        Manage all the exits of line.
        Return a dict of all the exits if the method is GET
        Otherwise, create a record of the exit
    """
    if request.method == "GET":
        try:
            if type(linea) == str and linea:
                staffLine = Loggout.objects.filter(linea_id__linea__exact = f"{request.session['Linea'] if 'Linea' in request.session else linea}", fecha__exact=f"{datetime.date(datetime.now())}", hora__range=__getHourRange())
                return JsonResponse({'name': [i.user.name for i in staffLine], "date": [i.fecha for i in staffLine], "time": [i.hora for i in staffLine]})                
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    elif request.method == "POST":
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            if(data):
                
                staffUser = Staff.objects.get(key__exact = f"{data['key']}")
                staffLine = Linea.objects.get(linea__exact=f"{request.session['Linea'] if 'Linea' in request.session else data['linea']}")
                productionInfo = infoProduccion.objects.get(info_id__linea_id__linea__exact=f"{request.session['Linea'] if 'Linea' in request.session else data['linea']}", fecha__exact=f"{datetime.date(datetime.now())}", inicio__exact=f"{datetime.now().hour}:00:00")
                
                hour = datetime.strftime(datetime.now(), "%H:%M:%S")
                if staffUser.status == "IN":
                    newEntrance = Loggout.objects.create(Id = None, fecha = datetime.date(datetime.now()), hora = hour, linea = staffLine, user = staffUser)
                    staffUser.status = "OFF"
                    history = History.objects.create(Id = None, user = staffUser, linea = staffLine, status = staffUser.status, registro = datetime.now())
                    staffUser.save()
                    workers = __changeWorkers(staffUser.status, productionInfo, request.session['Linea'] if 'Linea' in request.session else data['linea'])
                    return JsonResponse({'hour': newEntrance.hora, 'date': newEntrance.fecha, 'workers': workers}, status = 200)
                raise Exception("Tiene que marcar primero la entrada")
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)

    return HttpResponse(status = 405)

@require_http_methods(['GET'])
def History_Line(request, linea = None):
    if request.method == "GET":
        try:
            if type(linea) == str and linea != "":
                history_line = History.objects.filter(linea_id__linea__exact=f"{linea}", registro__range=(f"{datetime.date(datetime.now())} {__getHourRange()[0]}", f"{datetime.date(datetime.now())} {__getHourRange()[1]}"))
                ic([i.registro for i in history_line])
                return JsonResponse({'keys': [i.user.name for i in history_line], 'hour': [i.registro for i in history_line], 'status': [i.status for i in history_line]}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)


#ONLY METHODS
def __getHourRange() -> tuple:
    return ("06:00:00", "15:00:00") if datetime.now().hour >= 6 and datetime.now().hour < 13 else \
        ("15:00:00", "23:00:00") if datetime.now().hour >= 13 and datetime.now().hour < 23 else \
            ("23:00:00","06:00:00")

def __changeWorkers(reazon: str, objProduction: infoProduccion, linea: str) -> int:
    if objProduction.operarios == 0:
        to_sum_workers = infoProduccion.objects.get(info_id__linea_id__linea__exact=linea, inicio__exact = f"{datetime.now().hour - 1}:00:00", fecha__exact=f"{datetime.date(datetime.now())}")
        objProduction.operarios = to_sum_workers.operarios
        objProduction.save()

    if reazon == "IN":
        objProduction.operarios += 1
    else:
        objProduction.operarios -= 1
    objProduction.save()
    return objProduction.operarios
