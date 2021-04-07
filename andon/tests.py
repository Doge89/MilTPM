from faker import Faker
from datetime import datetime
from django.test import TestCase
from usuarios.models import Usuarios, Linea, Andon
fake = Faker()
# Create your tests here.
class AndonTestCase(TestCase):
    def setUp(self):
        Andon.objects.create(Id=None, estatus="mantenimiento", linea='MXC001', registro=datetime.now(), pause=datetime.now(), active=False)
    def andon(self):
        andon = Andon.objects.get(pk=1)   
        self.assertEqual(andon.estatus, "produccion")      
