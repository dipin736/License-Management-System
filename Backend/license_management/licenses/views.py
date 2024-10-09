from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import License
from .serializers import LicenseSerializer
from django.utils import timezone

class ValidateLicenseView(APIView):
    serializer_class = LicenseSerializer

    def post(self, request):
        license_key = request.data.get('license_key')

        license = License.objects.filter(key=license_key, is_active=True).first()

        if license:
            if license.expiration_date > timezone.now():
                return Response({
                    "valid": True,
                    "message": "License is valid."
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "valid": False,
                    "message": "License has expired."
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                "valid": False,
                "message": "License is invalid."  
            }, status=status.HTTP_400_BAD_REQUEST)
