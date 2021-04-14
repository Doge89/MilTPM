import requests, ast
from ValidLogin.valurls import *
from django.shortcuts import render
from django.http import HttpResponse
from usuarios.models import Usuarios
from django.forms.models import model_to_dict
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.hashers import check_password
# Create your views here.

def _get_credentials(username, password):
    credentials ={
        "username": username,
        "password": password
    }
    x = requests.post(url=validUrls.TOKEN, data=credentials)
    tokens = x.content.decode('UTF-8')
    tokens = ast.literal_eval(tokens)
    return tokens

#@csrf_exempt
@ensure_csrf_cookie
def index(request):
    if request.method == 'POST':
        
        try:
            userIn = request.POST.get('user')
            passwordIn = request.POST.get('password')

            #CONTRASEÑA REAL
            userData = Usuarios.objects.get(username__exact=f'{userIn}')
            userData = model_to_dict(userData)
            if check_password(passwordIn, str(userData['password'])):
                response = HttpResponse("Cookies Añadidas")
                print("Coinciden")
                if userData['user_type'] == 'production':
                    request.session['Linea'] = userData['linea']

                request.session['Usuario'] = userIn
                request.session['Pass'] = passwordIn
                request.session['priv'] = userData['user_type']
                #GET TOKENS
                tokens = _get_credentials(userIn, passwordIn)
                access = tokens['access']
                refresh = tokens['refresh']
                #VERIFY
                # print(access)
                # print(tokens)
                #print(request.session['Linea'])
                #SET COOKIES
                response.set_cookie(key = 'access', value=access, max_age=604800)
                response.set_cookie(key = 'refresh', value=refresh, max_age=604800)
                #RESPONSE
                return response
            else:
                print("LA CONTRASEÑA NO COINCIDE")
                return HttpResponse(status=401)
        except Usuarios.DoesNotExist:
            print("El usuario no existe :(")
        except Exception as e:
            print(e)
    else:
        pass
    return render(request, 'index.html')