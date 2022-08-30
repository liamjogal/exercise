from rest_framework import serializers

from .models import Workout

class WorkoutSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Workout
        fields = ('date', 'type', 'sets', 'reps', 'weight')


