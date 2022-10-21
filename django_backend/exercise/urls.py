from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'entries', views.ExerciseView)
router.register(r'bench_entries', views.BenchView)
router.register(r'squat_entries', views.SquatView)
router.register(r'deadlift_entries', views.DeadliftView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]