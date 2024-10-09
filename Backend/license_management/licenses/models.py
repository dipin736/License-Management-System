from django.db import models
import uuid

# Create your models here.

class License(models.Model):
    key = models.CharField(max_length=36, unique=True, default=uuid.uuid4)
    is_active = models.BooleanField(default=True)
    expiration_date = models.DateTimeField()

    def __str__(self):
        return self.key
