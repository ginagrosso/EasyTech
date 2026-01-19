from django.db import models


class ContactMessage(models.Model):
    """Modelo para almacenar mensajes de contacto"""
    name = models.CharField(max_length=100, verbose_name="Nombre")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Teléfono", blank=True)
    message = models.TextField(verbose_name="Mensaje")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de envío")
    
    class Meta:
        verbose_name = "Mensaje de Contacto"
        verbose_name_plural = "Mensajes de Contacto"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.email}"


class PageVisit(models.Model):
    """Modelo para registrar visitas a las páginas"""
    page_name = models.CharField(max_length=100, verbose_name="Página")
    ip_address = models.GenericIPAddressField(verbose_name="IP", null=True, blank=True)
    user_agent = models.TextField(verbose_name="Navegador", blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Fecha y Hora")
    
    class Meta:
        verbose_name = "Visita"
        verbose_name_plural = "Visitas"
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.page_name} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
