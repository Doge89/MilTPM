import ast

from icecream import ic
from hxh.models import *
from usuarios.models import *
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
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
                        workers = __changeWorkers(staffUser.status, productionInfo, request.session['Linea'] if 'Linea' in request.session else data['linea'], datetime.now().hour + 1)
                        return JsonResponse({'date': newEntrance.fecha, "hour": newEntrance.hora, 'workers': 0}, status = 200)
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
                    workers = __changeWorkers(staffUser.status, productionInfo, request.session['Linea'] if 'Linea' in request.session else data['linea'], datetime.now().hour + 1)
                    return JsonResponse({'hour': newEntrance.hora, 'date': newEntrance.fecha, 'workers': 0}, status = 200)
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

@require_http_methods(['POST', 'GET', 'PUT', 'DELETE'])
@csrf_exempt
def QueryByFilter(request):

    def SortData(obj_to_sort: History, **kwargs):
        """
            Sort de data given by the params
        """
        query1 = ""
        query2 = ""
        query3 = ""
        query4 = ""
        if 'byName' and "byHour" and "byAsc" in kwargs:

            query1 = "-user__name" if kwargs['byName'] and not kwargs['byAsc'] else \
                "user__name" if kwargs['byName'] and kwargs['byAsc'] else ""

            query2 = "-registro" if kwargs['byHour'] and not kwargs['byAsc'] else \
                "registro" if kwargs['byHour'] and kwargs['byAsc'] else ""

            query3 = "pk" if kwargs['byAsc'] else "-pk"

            data = obj_to_sort.order_by(f"{query1}") if query1 and not query2 else \
                obj_to_sort.order_by(f"{query2}") if not query2 and query2 else \
                    obj_to_sort.order_by(f"{query1}", f"{query2}") if query1 and query2 else \
                        obj_to_sort.order_by(f"{query3}")

            ic(data)
        return data

    ic(request.method)
    if request.method == "POST":
        try:
            now = datetime.now()
            data = request.POST.get('data')
            data= ast.literal_eval(data)
            line_to_query = request.session['Linea'] if 'Linea' in request.session else data['line']
            for i in data:
                # ic("%s %s" % (type(data[i]), data[i]))
                data[i] = bool(data[i])
            query_range = (f"{now.date()} {__getHourRange()[0]}", f"{now.date()} {__getHourRange()[1]}")
            res_query = History.objects.filter(registro__range=query_range, linea_id__linea__exact = line_to_query)
            #START "DYNAMIC" QUERY
            ic("%s %s" % (query_range, line_to_query))
            if(data['first']):
                res_query = res_query.first()
                if res_query != None:
                    return JsonResponse({"key": [res_query.user.name], "hour": [res_query.registro], "status": [res_query.status]}, status = 200)
                return JsonResponse({ 'key': [], 'hour': [], 'status': [] }, status = 200)
            
            if(data['last']):
                res_query = res_query.last()
                if res_query != None:
                    return JsonResponse({"key": [res_query.user.name], "hour": [res_query.registro], "status": [res_query.status]}, status = 200)
                return JsonResponse({ 'key': [], 'hour': [], 'status': [] }, status = 200)

            if(data['usersIn']):
                res_query = Staff.objects.filter(status__exact="IN")
                if res_query != None:
                    return JsonResponse({"key": [i.name for i in res_query], 
                        "hour": [i.register for i in res_query], "status": [i.status for i in res_query]}, status = 200
                    )
                return JsonResponse({ 'key': [], 'hour': [], 'status': [] }, status = 200)

            if(data['usersOff']):
                res_query = Staff.objects.filter(status__exact="OFF")
                if res_query != None:
                    return JsonResponse({"key": [i.name for i in res_query], 
                        "hour": [i.register for i in res_query], "status": [i.status for i in res_query]}, status = 200
                    )
                return JsonResponse({ 'key': [], 'hour': [], 'status': [] }, status = 200)

            res_query = SortData(obj_to_sort=res_query, byName = data['orderByName'], 
                byHour = data['orderByHour'], byAsc = data['orderAsc']
            )

            return JsonResponse({ 'key': [i.user.name for i in res_query], 'hour': [i.registro for i in res_query], 
                'status': [i.status for i in res_query] }, status = 200
            )
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)

@require_http_methods(['POST', 'GET'])
@csrf_exempt
def manage_user_micro(request):

    def __to_insert(reazon: str, chain: str) -> dict:
        if reazon and chain:
            now = datetime.now()
            workers = 0

            arr_data = chain.split(",")
            #ic(arr_data)
            to_get_index = [1, 2]
            arr_data = itemgetter(*to_get_index)(arr_data)

            user = Staff.objects.get(key__exact=arr_data[0])
            aux_sum_workers = Staff.objects.all()
            user.status = "IN" if reazon == "IN" else "OFF"
            user.save()

            line_to_user = Linea.objects.get(linea__exact=arr_data[1])
            production_info = infoProduccion.objects.get(info_id__linea_id__linea__exact=arr_data[1], fecha__exact=now.date(), inicio__exact = f"{now.hour}:00:00")
            next_production_info = infoProduccion.objects.get(info__linea_id__linea__exact=arr_data[1],
                fecha__exact=now.date(), inicio__exact=f"{now.hour + 1 if now.hour != 23 else 0}:00:00"
            )
            for i in aux_sum_workers:
                if i.status == "IN":
                    workers += 1
            
            production_info.operarios = workers
            next_production_info.operarios = workers
            production_info.save()
            next_production_info.save()

            newRecord = History.objects.create(Id = None, user = user, linea = line_to_user, status = reazon, registro = datetime.now())
            return {'user': user.name, "key": user.key, "status": user.status, "date": newRecord.registro}
        return {}


    if request.method == "POST":
        try:
            from operator import itemgetter
            data = request.POST.get('chain')
            if data:
                if "E" in data:
                    ic("%s %s" %("Entrada: ",len(data)))
                    res_data = __to_insert(reazon="IN", chain = data)
                    return JsonResponse({'data': res_data}, status = 201)

                if "S" in data:
                    ic( "%s %s" %("Salida: ",len(data)))
                    res_data = __to_insert(reazon="OFF", chain=data)
                    return JsonResponse({'data': res_data}, status = 201)


            return HttpResponse(status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)

#ONLY METHODS
def __getHourRange() -> tuple:
    return ("06:00:00", "14:00:00") if datetime.now().hour >= 6 and datetime.now().hour < 15 else \
        ("15:00:00", "22:00:00") if datetime.now().hour >= 13 and datetime.now().hour < 23 else \
            ("23:00:00","06:00:00")

def __changeWorkers(reazon: str, objProduction: infoProduccion, linea: str, nxt_hour: int) -> int:
    workes = 0
    to_sum_workers = Staff.objects.filter(linea_id__linea__exact=linea)
    worker_next_hour = infoProduccion.objects.get(inicio__exact=f"{nxt_hour}:00:00", fecha__exact=f"{datetime.date(datetime.now())}", info_id__linea_id__linea__exact=f"{linea}")
    for i in to_sum_workers:
        if i.status == "IN":
            workes += 1
    objProduction.operarios = workes
    worker_next_hour.operarios = workes
    worker_next_hour.save()
    objProduction.save()
    return objProduction.operarios
