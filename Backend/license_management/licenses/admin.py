from django.contrib import admin
from .models import License

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ('key', 'is_active', 'expiration_date')
    search_fields = ('key',)
    list_filter = ('is_active', 'expiration_date')
