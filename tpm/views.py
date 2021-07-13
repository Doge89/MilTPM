import ast, json
from icecream import ic
from datetime import datetime
from django.core import serializers
from django.shortcuts import render
from django.forms import model_to_dict
from MW.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from usuarios.models import Usuarios, Linea
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import PBKDF2PasswordHasher
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from .models import Cronograma, Tarjetas, Maquina, Actividades, sel_com, com
# Create your views here.
hasher = PBKDF2PasswordHasher()

#INDICE 
def index(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'priv' in request.session:
        return render(request, 'index.html', status = 200)
    return render(request, 'index.html', status = 401)

#OBTIENE LA INFORMACION PARA SER MOSTRADA EN EL PANEL DEL TPM 
@require_http_methods(['GET'])
def _get_panel_inf(request, linea=None):
    if request.method == 'GET':
        try:
            dia = datetime.now().weekday()
            cronAct = Cronograma.objects.filter(dia__exact=dia)
            serializedCronAct = serializers.serialize('json', list(cronAct))
            if 'Linea' in request.session:
                estados = Tarjetas.objects.filter(localizacion_id__linea__exact=f"{request.session['Linea']}", fecha__range=(f"{datetime.date(datetime.now())}", f"{datetime.now()}"))
            else:
                estados = Tarjetas.objects.filter(localizacion_id__linea__exact=f"{linea}", fecha__range=(f"{datetime.date(datetime.now())}", f"{datetime.now()}"))
            serializedEstados = serializers.serialize('json', list(estados))
            print(serializedEstados)
            try:
                if 'Linea' in request.session:
                    if datetime.now().hour == 9 and len(Tarjetas.objects.filter(localizacion_id__linea__exact=f"{request.session['Linea']}", fecha__range=(datetime.date(datetime.now()), datetime.now()))) == 0:
                        send_mail('TPM', 'NO SE HAN REALIZADO TARJETAS', EMAIL_HOST_USER, ['undertale.9055@gmail.com'], False)
                else:
                    if datetime.now().hour == 9 and len(Tarjetas.objects.filter(localizacion_id__linea__exact=f"{linea}", fecha__range=(datetime.date(datetime.now()), datetime.now()))) == 0:
                        send_mail('TPM', 'NO SE HAN REALIZADO TARJETAS', EMAIL_HOST_USER, ['undertale.9055@gmail.com'], False)
            except Exception as e:
                print(e)
            return JsonResponse({'maqdia': serializedCronAct, "tarjetas": serializedEstados}, status=200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
        except Cronograma.DoesNotExist:
            print("No hay maquinas programadas para hoy")
            return JsonResponse({'mensaje': "No existen maquinas programadas para hoy"},status=200)
    return HttpResponse(status=405)

#POSTEA LA INFORMACION SOLICITADA
@require_http_methods(['POST'])
@ensure_csrf_cookie
#@csrf_exempt
def _post_tpm_inf(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            print(data)
            data = ast.literal_eval(data)
            print(data)
            maquina = Maquina.objects.get(nombre__exact=data['categoria'])
            linea = Linea.objects.get(linea__exact=f"{data['linea']}")
            user = Usuarios.objects.get(username__exact=f"{request.session['Usuario']}")
            tarjeta = Tarjetas.objects.create(Id=None, maquina=maquina, descripcion=data['descripcion'], usuario = user, area='ensamble', categoria=data['categoria'], localizacion=linea, tipo=data['tipo'], fecha=datetime.now())
            if data['tipo'] != 1:
                html_message = f"\
                <div style='width: 50%; margin: auto; background-color: yellow; border-radius: 10px; padding: 15px; color: black;'>\
                    <h1 style='text-align:center; font-family: Arial;'>TARJETA NO CONFORME</h1>\
                    <div style='width: 100%; background-color: white;'>\
                        <div style='padding: 10px;'>\
                            <div style='display: flex; align-items:center; justify-content: space-between; margin-bottom: 25px;'>\
                                <span style='width: 25%; font-size: 20px; font-weight: bold;'>NOMBRE: </span>\
                                <input style='width: 75%; outline: none; cursor: default; font-family: Arial; border-radius: 5px; padding: 10px; border: none; border-bottom: 1px solid black;' value={request.session['Usuario']} readonly>\
                            </div>\
                            <div style='display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px;'>\
                                <span style='width: 25%; font-size: 20px; font-weight: bold;'>AREA: </span>\
                                <input style='width: 75%; outline: none; cursor: default; font-family: Arial; border-radius: 5px; padding: 10px; border: none; border-bottom: 1px solid black;' value='Ensamble' readonly>\
                            </div>\
                            <div style='display: flex; align-items:center; justify-content: space-between; margin-bottom: 25px;'>\
                                <span style='width: 25%; font-size: 20px; font-weight: bold;'>CATEGORIA: </span>\
                                <input style='width: 75%; outline: none; cursor: default; font-family: Arial; border-radius: 5px; padding: 10px; border: none; border-bottom: 1px solid black;' value={data['categoria']} readonly>\
                            </div>\
                            <div style='display: flex; align-items:center; justify-content: space-between; margin-bottom: 25px;'>\
                                <span style='width: 25%; font-size: 20px; font-weight: bold;'>LOCALIZACIÓN: </span>\
                                <input style='width: 75%; outline: none; cursor: default; font-family: Arial; border-radius: 5px; padding: 10px; border: none; border-bottom: 1px solid black;' value={data['linea']} readonly>\
                            </div>\
                            <div style='margin-bottom: 25px;'>\
                                <span style='font-size: 20px; font-weight: bold;'>DESCRIPCIÓN DEL PROBLEMA: </span>\
                                <textarea style='outline: none; cursor: default; font-family: Arial; border-radius: 5px; padding: 10px; border: 1px solid black; resize: none; width: 100%;' rows='15' columns='25' readonly>{data['descripcion']}</textarea>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                "
                send_mail('TPM', 'NO CONFORME', EMAIL_HOST_USER, ['undertale.9055@gmail.com'], False, html_message=html_message)
            return HttpResponse(status=201)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)     
    return HttpResponse(status=405)

@require_http_methods(['POST'])
@ensure_csrf_cookie
#@csrf_exempt
def _get_act_machine(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('id')
            actividades = Actividades.objects.filter(maquinas_id__exact=data)
            serializedAct = serializers.serialize('json', list(actividades))
            print(serializedAct)
            return JsonResponse({'actividades': serializedAct}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

#CRONOGRAMA
@require_http_methods(['GET', 'POST'])
@ensure_csrf_cookie
#@csrf_exempt
def cronograma(request, linea=None):
    if request.method == 'GET' :
        try:
            print(linea)
            Maquinas = Maquina.objects.all()
            cronograma = Cronograma.objects.all()
            serializedMaquinas = serializers.serialize('json', list(Maquinas))
            serializedCronograma = serializers.serialize('json', list(cronograma))
            print(serializedMaquinas)
            print(serializedCronograma)
            
            if 'Linea' in request.session:
                return JsonResponse({'maquinas': serializedMaquinas, "cronograma": serializedCronograma, "linea": request.session['Linea'], "usuario": request.session['Usuario']}, status = 200)
            else:
                return JsonResponse({'maquinas': serializedMaquinas, "cronograma": serializedCronograma,"linea": linea, "usuario": request.session['Usuario']}, status = 200)
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
@ensure_csrf_cookie
#@csrf_exempt
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
@ensure_csrf_cookie
#@csrf_exempt
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
                "clave": [i.clave for i in usuarios]
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
            user = Usuarios.objects.create_superuser(username=data['user'], email=data['email'], password=data['password'], linea=data['linea'], clave = data['clave'], user_type=data['tipoUsuario'])
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
@ensure_csrf_cookie
#@csrf_exempt
def _del_user(request):
    if request.method == 'POST' and request.session['priv'] == 'admin':
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
@ensure_csrf_cookie
#@csrf_exempt
def _modify_user(request):
    if request.method == 'POST' and request.session['priv'] == 'admin':
        try:
            data = request.POST.get('data')
            data =ast.literal_eval(data) 
            print(data)
            user = Usuarios.objects.get(pk=data['id'])
            user.username = data['user']
            password = hasher.encode(data['password'], hasher.salt())
            user.password = password
            user.linea = data['linea']
            user.email = data['email']
            user.save()
            print(user)
            return HttpResponse(status=202)
        except Exception as e:
            print(e)
    return HttpResponse(status = 405)

@require_http_methods(['POST'])
@csrf_exempt
def _add_production_line(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            user = Usuarios.objects.get(username__exact=f"{data['usuario']}")
            linea = Linea.objects.create(Id = None, linea = f"{data['linea']}", usuario = user)
            return HttpResponse(status = 201)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)

@require_http_methods(['POST', 'GET'])
@ensure_csrf_cookie
#@csrf_exempt
def _select_com(request):
    if request.session['priv'] == 'admin': 
        if request.method == 'GET':
            try:
                com = sel_com.objects.get(pk=1)
                return JsonResponse({'puerto': com.com}, status=201)
            except sel_com.DoesNotExist:
                print('No hay puertos creados')
                sel_com.objects.create(Id= None, com="COM1")
        else:
            try:
                data = request.POST.get('com')
                com = sel_com.objects.get(pk=1)
                com.com = data
                com.save()
                return HttpResponse(status=201)
            except Exception as e:
                print(e)
                return HttpResponse(status=500)
    return HttpResponse(status=401)

#HISTORIAL
@require_http_methods(['POST'])
@ensure_csrf_cookie
#@csrf_exempt
def _machine_history(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)
            #user = Usuarios.objects.get(username__exact=f"{request.session['Usuario']}")
            hisTarj = Tarjetas.objects.filter(localizacion_id__linea__exact=f"{data['linea']}", maquina_id__nombre__exact=f"{data['maquina']}")
            arrTarj = list(hisTarj)
            userArr = list()
            for i in arrTarj:
                userArr.append(i.usuario.username)
            
            serializedTarj = serializers.serialize('json', list(hisTarj))
            return JsonResponse({'hist': serializedTarj, 'users': userArr}, status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
        except Tarjetas.DoesNotExist:
            print("No existen tarjetas todavia")
            return JsonResponse({'Mensaje': "Todavia no existen tarjetas de esta maquina"}, status = 200)
    return HttpResponse(status=405)

#TARJETA ESPECIFICA
@require_http_methods(['POST'])
@ensure_csrf_cookie
#@csrf_exempt
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

@require_http_methods(['POST'])
@ensure_csrf_cookie
#@csrf_exempt
def _get_machine_card_by_id(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            data = ast.literal_eval(data)

            Tarj = Tarjetas.objects.get(Id__exact=f"{data['id']}", localizacion_id__linea__exact=f"{data['linea']}")
            serializedTarj = model_to_dict(Tarj)
            
            return JsonResponse({'card': serializedTarj, "usuario": request.session['Usuario']}, status = 200)
        except Tarjetas.DoesNotExist:
            print("No existe la Tarjeta")
            return JsonResponse({'mensaje': "No existen registros"},status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status = 405)

@require_http_methods(['POST'])
@ensure_csrf_cookie
#@csrf_exempt
def _modify_card(request):
    if request.method == 'POST':
        try:
            data = request.POST.get('data')
            print(data)
            data = ast.literal_eval(data)
            tarjeta = Tarjetas.objects.get(pk=data['id'])
            tarjeta.propuesta = data['propuesta']
            tarjeta.implementada = data['implementada']
            tarjeta.save()
            return HttpResponse(status=202)
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=405)

@require_http_methods(['GET'])
def __get_line_info(request, linea = None):
    if request.method == "GET":
        try:
            if type(linea) == str and linea != "":
                infoLine = Linea.objects.get(linea__exact=f"{linea}")
                userLine = Usuarios.objects.get(linea__exact=f"{linea}")
                return JsonResponse({'Linea': infoLine.linea, 'Personal': infoLine.personal, "username": userLine.username})
        except TypeError as te:
            ic("Tipo de dato erroneo o no contiene informacion")
            return HttpResponse(status = 400)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)

@require_http_methods(['POST'])
@ensure_csrf_cookie
def _change_line_data(request):
    if request.method == "POST":
        try:
            data = request.POST.get('data')
            if data:
                data = ast.literal_eval(data)
                ic(data)
                lineToEdit = Linea.objects.get(linea__exact=f"{data['lineToEdit']}")
                if lineToEdit:
                    lineToEdit.personal = int(data['newWorkers'])
                    lineToEdit.save()
                    return HttpResponse(status = 200)
                return HttpResponse(status = 400)
            raise Exception("La informacion se encuentra vacia")
            return HttpResponse(status = 400)
        except Exception as e:
            print(e)
            return HttpResponse(status = 500)
    return HttpResponse(status = 405)
