# EasyTech - Website Corporativo

🚀 Sitio web profesional para empresa de desarrollo de software, construido con Django, HTML, CSS y JavaScript.

## 🎨 Características

- ✨ Diseño moderno con degradados violeta-cian
- 📱 Totalmente responsivo (Mobile-first)
- 🎭 Animaciones suaves y efectos 3D
- 🌙 Tema oscuro profesional
- ⚡ Carga rápida y optimizado
- 📧 Sistema de contacto funcional
- 🔧 Arquitectura en capas (Django)

## 🛠️ Tecnologías

- **Backend**: Python 3.8+ / Django 4.2+
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Tipografía**: Google Fonts (Poppins)
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)

## 📁 Estructura del Proyecto

```
EasyTech/
├── easytech/                 # Configuración Django
│   ├── settings.py          # Configuración del proyecto
│   ├── urls.py              # URLs principales
│   └── wsgi.py              # WSGI configuration
├── web/                      # Aplicación principal
│   ├── models.py            # Modelos de datos
│   ├── views.py             # Vistas/Controladores
│   ├── urls.py              # URLs de la app
│   └── admin.py             # Panel de administración
├── templates/                # Plantillas HTML
│   ├── base.html            # Template base
│   └── web/                 # Templates de páginas
│       ├── home.html        # Página principal
│       ├── services.html    # Servicios
│       ├── about.html       # Sobre nosotros
│       └── contact.html     # Contacto
├── assets/                   # Archivos estáticos
│   ├── css/
│   │   └── style.css        # Estilos principales
│   ├── js/
│   │   └── main.js          # JavaScript principal
│   └── images/
│       ├── ET.jpeg          # Logo
│       └── portadaET.jpeg   # Imagen portada
├── manage.py                 # CLI de Django
└── requirements.txt          # Dependencias Python
```

## 🚀 Instalación y Configuración

### 1. Crear entorno virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar base de datos

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Crear superusuario (opcional)

```bash
python manage.py createsuperuser
```

### 5. Ejecutar servidor de desarrollo

```bash
python manage.py runserver
```

Accede a: `http://localhost:8000`

## 📄 Páginas Disponibles

| Página | URL | Descripción |
|--------|-----|-------------|
| Inicio | `/` | Página principal con hero y resumen |
| Servicios | `/servicios/` | Detalle de servicios ofrecidos |
| Nosotros | `/nosotros/` | Información de la empresa |
| Contacto | `/contacto/` | Formulario de contacto |
| Admin | `/admin/` | Panel de administración |

## 🎯 Secciones Principales

### Home
- Hero section con imagen de portada
- Servicios destacados
- Proceso de trabajo (4 pasos)
- Diferenciales "Por qué elegir EasyTech"
- CTA (Call to Action)

### Servicios
- Desarrollo Web
- Desarrollo Móvil
- Sistemas Empresariales
- Consultoría IT
- Cloud & DevOps
- Mantenimiento & Soporte

### Sobre Nosotros
- Misión, Visión y Valores
- Estadísticas de la empresa
- Equipo de trabajo
- Beneficios de trabajar con nosotros

### Contacto
- Formulario funcional
- Información de contacto
- Preguntas frecuentes (FAQ)

## 🎨 Personalización

### Colores

Los colores principales están definidos en `assets/css/style.css`:

```css
--primary-violet: #b026ff;
--primary-cyan: #00d9ff;
--dark-bg: #0a0e1a;
--darker-bg: #050810;
```

### Contenido

Para modificar el contenido:
- **Servicios**: Edita `web/views.py` (función `services`)
- **Textos**: Modifica los templates en `templates/web/`
- **Imágenes**: Reemplaza en `assets/images/`

## 📧 Configuración de Email (Producción)

Para que el formulario de contacto envíe emails, configura en `settings.py`:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'tu-email@gmail.com'
EMAIL_HOST_PASSWORD = 'tu-contraseña-de-app'
```

## 🔒 Seguridad (Producción)

Antes de desplegar:

1. Cambia `SECRET_KEY` en `settings.py`
2. Establece `DEBUG = False`
3. Configura `ALLOWED_HOSTS`
4. Usa base de datos PostgreSQL
5. Configura HTTPS
6. Habilita CSRF protection

## 📊 Base de Datos

### Modelos

**ContactMessage**: Almacena mensajes del formulario de contacto
- `name`: Nombre del contacto
- `email`: Email del contacto
- `phone`: Teléfono (opcional)
- `message`: Mensaje
- `created_at`: Fecha de envío

Ver mensajes en: `http://localhost:8000/admin/`

## 🎯 SEO y Performance

- Metadata optimizado
- Imágenes optimizadas
- CSS y JS minificados (producción)
- Lazy loading de imágenes
- Cache configurado

## 🤝 Contribuir

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

© 2025 EasyTech. Todos los derechos reservados.

## 📞 Contacto

- **Email**: info@easytech.com
- **Tel**: +52 123 456 7890
- **Web**: www.easytech.com

## 🎓 Recursos

- [Django Documentation](https://docs.djangoproject.com/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript MDN](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

**Desarrollado con ❤️ por EasyTech**
