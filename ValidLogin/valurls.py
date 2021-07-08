import requests, socket
class validUrls():
    TOKEN =  f'http://{socket.gethostbyname(socket.gethostname())}:8000/api/token/'
    REFRESH = f'http://{socket.gethostbyname(socket.gethostname())}:8000/api/token/refresh/'
    VALIDATE = f'http://{socket.gethostbyname(socket.gethostname())}:8000/api/token/verify/'
    VALCOOKIE = f'http://{socket.gethostbyname(socket.gethostname())}:8000/login/validate/token/' 

""" class validUrls():
    TOKEN =  'http://192.168.100.12:8000/api/token/'
    REFRESH = 'http://192.168.100.12:8000/api/token/refresh/'
    VALIDATE = 'http://192.168.100.12:8000/api/token/verify/'
    VALCOOKIE = 'http://192.168.100.12:8000/login/validate/token/' """ 

        
