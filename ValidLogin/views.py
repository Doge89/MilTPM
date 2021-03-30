from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
# Create your views here.

def validation(request):
    if 'Usuario' in request.session and 'Pass' in request.session:
        return JsonResponse({'Logged':True}, status = 200)
    else:
        print("NO TIENE AUTORIAZION")
    return JsonResponse({'Logged':False}, status = 200)

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