from django.db import models
import uuid

class Guest(models.Model):
    id = models.AutoField(
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
    
class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=255)
    imgUrl = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Session(models.Model):
    session_id = models.UUIDField(
        default = uuid.uuid4,
        unique = True,
        editable = False
    )
    guest = models.ForeignKey(
        Guest,
        on_delete = models.CASCADE,
        related_name = 'sessions'
    )

    def __str__(self):
        return f"Session {self.session_id} for {self.guest.name}"