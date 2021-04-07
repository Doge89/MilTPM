from django.test import TestCase
from usuarios.models import Usuarios
from faker import Faker
fake = Faker()
# Create your tests here.
class LoginTestCase(TestCase):
    def setUp(self):
        user = Usuarios.objects.create(id = None, username = fake.name, password = fake.password)
    def Login(self):
        print("Iniciando test...")
