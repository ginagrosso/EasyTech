"""
Configuración WSGI para el proyecto EasyTech.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'easytech.settings')

application = get_wsgi_application()
app = application
