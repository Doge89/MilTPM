from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse, HttpResponse
# Create your views here.

def validation(request):
    if 'Usuario' in request.session and 'Pass' in request.session:
        return JsonResponse({'Logged':True}, status = 200)
    else:
        response = HttpResponse('CSFR', status = 200)
        response.set_cookie(key = 'csrftoken', value = get_token(request), max_age=604800)
        print("NO TIENE AUTORIAZION")
        return response
    return JsonResponse({'Logged': False}, status = 200)

#CIERRE DE SESION DE

def loggout(request):
    response = HttpResponse('Cookies Eliminadas', status =200)
    print("Eliminando Cookies...")
    if 'Usuario' in request.session and 'Pass' in request.session:
        response.delete_cookie('access', path = '/')
        response.delete_cookie('refresh',path = '/')
        del request.session['Usuario']
        del request.session['Pass']
        return response
    return render(request, 'index.html')