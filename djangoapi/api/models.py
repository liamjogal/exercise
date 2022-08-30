from django.db import models

# Create your models here.

class Workout(models.Model):

    date = models.CharField(max_length=60)
    type = models.CharField(max_length=60)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.DecimalField(max_digits=6, decimal_places=1)

    def __str__(self):
        return self.date + " " + self.type



