from rest_framework import serializers

from .models import Exercise, Squat, Bench, Deadlift

class ExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = ('id', "date", "exercise", "weight", "reps", "sets")


class SquatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Squat
        fields = ('id', "date", "weight", "reps", "sets")

class BenchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bench
        fields = ('id', "date", "weight", "reps", "sets")

class DeadliftSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deadlift
        fields = ('id', "date", "weight", "reps", "sets")