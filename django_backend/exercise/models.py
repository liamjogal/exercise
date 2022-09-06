from django.db import models

class Exercise(models.Model):
    date = models.DateTimeField()
    exercise=models.CharField(max_length=500)
    weight=models.DecimalField(max_digits=6, decimal_places=2)
    reps=models.IntegerField()
    sets=models.IntegerField()

    def __str__(self):
        return self.exercise
