# licenses/urls.py
from django.urls import path
from .views import ValidateLicenseView

urlpatterns = [
    path('validate_license/', ValidateLicenseView.as_view(), name='validate_license'),
]
