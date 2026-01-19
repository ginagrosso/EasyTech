from django.contrib import admin
from django.db.models import Count
from django.utils.html import format_html
from .models import ContactMessage, PageVisit


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)


@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ('page_name', 'ip_address', 'short_user_agent', 'timestamp')
    list_filter = ('page_name', 'timestamp')
    search_fields = ('page_name', 'ip_address')
    readonly_fields = ('page_name', 'ip_address', 'user_agent', 'timestamp')
    ordering = ('-timestamp',)
    date_hierarchy = 'timestamp'
    
    def short_user_agent(self, obj):
        """Mostrar versión corta del user agent"""
        if obj.user_agent:
            return obj.user_agent[:50] + '...' if len(obj.user_agent) > 50 else obj.user_agent
        return '-'
    short_user_agent.short_description = 'Navegador'
    
    def changelist_view(self, request, extra_context=None):
        """Agregar estadísticas al listado"""
        extra_context = extra_context or {}
        
        # Contar visitas por página
        stats = PageVisit.objects.values('page_name').annotate(
            total=Count('id')
        ).order_by('-total')
        
        extra_context['page_stats'] = stats
        extra_context['total_visits'] = PageVisit.objects.count()
        
        return super().changelist_view(request, extra_context)
