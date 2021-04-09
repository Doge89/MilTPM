import requests, ast
from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse, HttpResponse
# Create your views here.
URL = 'http://10.134.35.11/api/token/verify/'
REFRESH = 'http://10.134.35.11/api/token/refresh/'

def validation(request):
    if 'Usuario' in request.session and 'Pass' in request.session and 'priv' in request.session:
        
        if 'Linea' in request.session:
            return JsonResponse({'Logged':True, 'linea': request.session['Linea'], "Usuario": request.session['Usuario'], 'priv': request.session['priv']}, status = 200)
        else:
            return JsonResponse({'Logged':True, "Usuario": request.session['Usuario'], 'priv': request.session['priv']}, status = 200)
    else:
        return JsonResponse({'Logged': False}, status = 200)
    return JsonResponse({'Logged': False}, status = 200)

#CIERRE DE SESION DE

def loggout(request):
    response = HttpResponse('Cookies Eliminadas', status =200)
    print("Eliminando Cookies...")
    if 'Usuario' in request.session and 'Pass' in request.session and 'priv' in request.session:
        response.delete_cookie('access', path = '/')
        response.delete_cookie('refresh',path = '/')
        del request.session['Usuario']
        del request.session['Pass']
        if 'Linea' in request.session:
            del request.session['Linea']
        del request.session['priv']
        return response
    return render(request, 'index.html')

#VALIDACION DE TOKENS
def _token_validation(request):
    if 'Usuario' in request.session and 'Pass' in request.session:
        try:
            response = HttpResponse('Cookies', status = 200)
            acceso = request.COOKIES.get('access')
            refresh = request.COOKIES.get('refresh')
            #print(acceso, refresh)
            
            # return HttpResponse(status=200)
            access = validate(access=acceso, refresh = refresh)
            print(access)
            
            if access == "True":
                print("COOKIES VALIDAS")
                return response
            elif access == "False":
                print("NO TIENE PERMISOS")
                del request.session['Usuario']
                del request.session['Linea']
                del request.session['Pass']
                del request.session['priv']
                response.delete_cookie('access', path = '/')
                response.delete_cookie('refresh', path = '/')
                return HttpResponse(status=401)
            else:
                print("COOKIES ACTUALIZADAS")
                response.set_cookie('access', access, 604800)
                return response
            
        except Exception as e:
            print(e)
            return HttpResponse(status=500)
    return HttpResponse(status=401)

def validate(access, refresh):
    print("VALIDANDO...")
    print(access)
    tokRef = {
        "token": refresh
    }
    acceso = {
        "token": access
    }
    x = requests.post(URL, acceso)
    y = requests.post(URL, tokRef)
    x = ast.literal_eval(x.content.decode('UTF-8'))
    y = ast.literal_eval(y.content.decode('UTF-8'))
    if not x.get('code'):
        return "True"
    elif not y.get('code'):
        tokRef = {
            "refresh": refresh
        }
        x = requests.post(REFRESH, tokRef)
        accToken = ast.literal_eval(x.content.decode('UTF-8'))
        print(accToken)
        return accToken['access']
    else:
        return "False"