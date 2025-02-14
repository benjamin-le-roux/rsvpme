from django.db import models

class Guest(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    attending = models.BooleanField(default=False)

    def __str__(self):
        return self.name