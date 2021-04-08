"""MW URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    #URLS PARA VALIDACIONES Y LOGIN
    path('admin/', admin.site.urls),
    path('login/', include('Login.urls'), name='login'),
    path('Login/', include('Login.urls'), name='login'),
    path('login/validate/', include('ValidLogin.urls')),
    path('', include('Login.urls'), name='index'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    #TPM ENLACES
    path('hxh/', include('hxh.urls'), name='HXH'),
    path('andon/', include('andon.urls'), name='Andon'),
    path('mp/', include('mp.urls'), name='MP'),
    path('tpm/', include('tpm.urls'), name='TPM'),
    path('layout/', include('layout.urls'), name='layout')

]
