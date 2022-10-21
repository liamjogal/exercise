from re import A
from django.contrib import admin

from .models import Exercise, Squat, Bench, Deadlift


class ExerciseAdmin(admin.ModelAdmin):
    list_display= ("date", "exercise", "weight", "reps", "sets")

class SquatAdmin(admin.ModelAdmin):
    list_display= ("date", "weight", "reps", "sets")

class BenchAdmin(admin.ModelAdmin):
    list_display= ("date", "weight", "reps", "sets")

class DeadliftAdmin(admin.ModelAdmin):
    list_display= ("date", "weight", "reps", "sets")


admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(Squat, SquatAdmin)
admin.site.register(Bench, BenchAdmin)
admin.site.register(Deadlift, DeadliftAdmin)