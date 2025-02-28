from django.db import models
import uuid

class Guest(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4,
        primary_key=True,
        unique=True,
        editable=False
    )
    name = models.CharField(max_length=255)
    email = models.EmailField()
    attending = models.BooleanField(default=False)
    companions = models.IntegerField(default=0)
    

    def __str__(self):
        return self.name