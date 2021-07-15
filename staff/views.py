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
                #lineStaff = Linea.objects.get(linea__exact = f"{request.session['Linea'] if 'Linea' in request.session else linea}")
                staffLine = SignUp.objects.filter(linea_id__linea__exact = f"{request.session['Linea'] if 'Linea' in request.session else linea}", fecha__exact=f"{datetime.date(datetime.now())}")
                return JsonResponse({'name': [i.user.name for i in staffLine], 'date': [i.fecha for i in staffLine], 'time': [i.hora for i in staffLine]})
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
                    ic(staffLine)
                    hour = datetime.strftime(datetime.now(), "%H:%M:%S")
                    newEntrance = SignUp.objects.create(Id = None, fecha = datetime.date(datetime.now()), hora = f"{hour}", linea = staffLine, user = staffUser)
                    return JsonResponse({'date': newEntrance.fecha, "hour": newEntrance.hora}, status = 200)
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
                staffLine = Loggout.objects.filter(linea_id__linea__exact = f"{request.session['Linea'] if 'Linea' in request.session else linea}")
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
                hour = datetime.strftime(datetime.now(), "%H:%M:%S")
                newEntrance = Loggout.objects.create(Id = None, fecha = datetime.date(datetime.now()), hora = hour, linea = staffLine, user = staffUser)
                return JsonResponse({'hour': newEntrance.hora, 'date': newEntrance.fecha}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)

    return HttpResponse(status = 405)
