from rest_framework import viewsets

from .serializers import WorkoutSerializer
from .models import Workout

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all().order_by('date')
    serializer_class = WorkoutSerializer