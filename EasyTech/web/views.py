from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactMessage


def home(request):
    """Vista principal - Home Page"""
    return render(request, 'web/home.html')


def services(request):
    """Vista de servicios"""
    services_list = [
        {
            'title': 'Desarrollo Web',
            'description': 'Creamos aplicaciones web modernas y escalables.',
            'icon': 'icon-web'
        },
        {
            'title': 'Desarrollo Móvil',
            'description': 'Apps nativas y multiplataforma de alto rendimiento.',
            'icon': 'icon-mobile'
        },
        {
            'title': 'Sistemas Empresariales',
            'description': 'Automatización de procesos de negocio.',
            'icon': 'icon-business'
        },
        {
            'title': 'Consultoría IT',
            'description': 'Asesoramiento experto en tecnología y arquitectura.',
            'icon': 'icon-consulting'
        },
        {
            'title': 'Cloud & DevOps',
            'description': 'Infraestructura en la nube y entrega continua.',
            'icon': 'icon-cloud'
        },
        {
            'title': 'Mantenimiento & Soporte',
            'description': 'Soporte técnico y evolución de tu software.',
            'icon': 'icon-support'
        }
    ]
    
    context = {
        'services': services_list
    }
    return render(request, 'web/services.html', context)


def about(request):
    """Vista sobre nosotros"""
    return render(request, 'web/about.html')


def contact(request):
    """Vista de contacto"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone', '')
        message = request.POST.get('message')
        
        if name and email and message:
            ContactMessage.objects.create(
                name=name,
                email=email,
                phone=phone,
                message=message
            )
            messages.success(request, '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.')
            return redirect('contact')
        else:
            messages.error(request, 'Por favor completa todos los campos obligatorios.')
    
    return render(request, 'web/contact.html')
