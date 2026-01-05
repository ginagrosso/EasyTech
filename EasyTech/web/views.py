from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
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
    """Vista de contacto con envío de emails"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone', '')
        message = request.POST.get('message')
        
        if name and email and message:
            # Guardar en base de datos
            contact_msg = ContactMessage.objects.create(
                name=name,
                email=email,
                phone=phone,
                message=message
            )
            
            # Enviar emails
            try:
                # Email al administrador
                subject = f'Nueva consulta de {name}'
                
                # Mensaje en texto plano
                text_content = f"""
Nueva consulta recibida desde el sitio web:

Nombre: {name}
Email: {email}
Teléfono: {phone if phone else 'No proporcionado'}

Mensaje:
{message}

---
Este mensaje fue enviado desde el formulario de contacto de EasyTech.
                """
                
                # Mensaje HTML
                html_content = f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #b026ff;">Nueva Consulta - EasyTech</h2>
                        <p>Se ha recibido una nueva consulta desde el sitio web:</p>
                        
                        <table style="width: 100%; margin: 20px 0;">
                            <tr>
                                <td style="padding: 8px; background: #f4f4f4; font-weight: bold; width: 120px;">Nombre:</td>
                                <td style="padding: 8px;">{name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; background: #f4f4f4; font-weight: bold;">Email:</td>
                                <td style="padding: 8px;"><a href="mailto:{email}">{email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; background: #f4f4f4; font-weight: bold;">Teléfono:</td>
                                <td style="padding: 8px;">{phone if phone else 'No proporcionado'}</td>
                            </tr>
                        </table>
                        
                        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #b026ff; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #555;">Mensaje:</h3>
                            <p style="white-space: pre-wrap;">{message}</p>
                        </div>
                        
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                        <p style="font-size: 12px; color: #777;">
                            Este mensaje fue enviado desde el formulario de contacto de EasyTech.
                        </p>
                    </div>
                </body>
                </html>
                """
                
                # Crear email con versión HTML y texto plano
                email_msg = EmailMultiAlternatives(
                    subject=subject,
                    body=text_content,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[settings.ADMIN_EMAIL],
                    reply_to=[email]
                )
                email_msg.attach_alternative(html_content, "text/html")
                email_msg.send()
                
                # Email de confirmación al cliente
                client_subject = 'Hemos recibido tu mensaje - EasyTech'
                client_text = f"""
Hola {name},

Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.

Tu mensaje:
{message}

Saludos,
El equipo de EasyTech
                """
                
                client_html = f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #b026ff;">¡Gracias por contactarnos!</h2>
                        <p>Hola <strong>{name}</strong>,</p>
                        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo en las próximas 24 horas.</p>
                        
                        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00d9ff; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #555;">Tu mensaje:</h3>
                            <p style="white-space: pre-wrap;">{message}</p>
                        </div>
                        
                        <p>Mientras tanto, puedes conocer más sobre nuestros servicios en nuestra página web.</p>
                        
                        <p style="margin-top: 30px;">
                            Saludos,<br>
                            <strong>El equipo de EasyTech</strong>
                        </p>
                        
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                        <p style="font-size: 12px; color: #777;">
                            Si no solicitaste este mensaje, puedes ignorarlo.
                        </p>
                    </div>
                </body>
                </html>
                """
                
                client_email = EmailMultiAlternatives(
                    subject=client_subject,
                    body=client_text,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[email]
                )
                client_email.attach_alternative(client_html, "text/html")
                client_email.send()
                
                messages.success(request, '¡Mensaje enviado con éxito! Te hemos enviado una confirmación a tu email.')
                
            except Exception as e:
                # Si falla el email, al menos se guardó en BD
                messages.warning(request, 'Tu mensaje fue recibido, pero hubo un problema al enviar la notificación. Te contactaremos pronto.')
            
            return redirect('contact')
        else:
            messages.error(request, 'Por favor completa todos los campos obligatorios.')
    
    return render(request, 'web/contact.html')
