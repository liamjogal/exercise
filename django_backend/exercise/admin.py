from django.contrib import admin

from .models import Exercise

class ExerciseAdmin(admin.ModelAdmin):
    list_display= ("date", "exercise", "weight", "reps", "sets")


admin.site.register(Exercise, ExerciseAdmin)