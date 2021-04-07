from faker import Faker
from django.test import TestCase
from usuarios.models import Usuarios, Linea
# Create your tests here.
fake = Faker()
class CreateUserTestCase(TestCase):
    def setUp(self):
        user = Usuarios.objects.create_user(username=fake.username, email=fake.email, password=fake.password, linea='MXC010', clave=fake.password)
        user2 = Usuarios.objects.create_user(username=fake.username, email=fake.email, password=fake.password, linea='MXC010', clave=fake.password)
    def username_max_length(self):
        user = Usuarios.objects.get(pk=1)
        max_length = user._meta.get_field('username').max_length
        self.assertEqual(max_length, 200)
    def diff_productions(self):
        user1 = Usuarios.objects.get(pk=1)
        user2 = Usuarios.objects.get(pk=2)
        self.assertNotEqual(user1.linea, user2.linea)