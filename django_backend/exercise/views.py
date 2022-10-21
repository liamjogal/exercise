from django.shortcuts import render

from rest_framework import viewsets

from .serializers import ExerciseSerializer, SquatSerializer, BenchSerializer, DeadliftSerializer

from .models import Exercise, Squat, Bench, Deadlift

class ExerciseView(viewsets.ModelViewSet):
    serializer_class = ExerciseSerializer

    queryset = Exercise.objects.all()


class SquatView(viewsets.ModelViewSet):
    serializer_class = SquatSerializer

    queryset = Squat.objects.all()

class BenchView(viewsets.ModelViewSet):
    serializer_class = BenchSerializer

    queryset = Bench.objects.all()

class DeadliftView(viewsets.ModelViewSet):
    serializer_class = DeadliftSerializer

    queryset = Deadlift.objects.all()
    
