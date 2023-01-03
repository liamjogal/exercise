from rest_framework.routers import SimpleRouter
from user.viewsets import UserViewSet
from auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from django.urls import include, path

routes = SimpleRouter()

routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

routes.register(r'user', UserViewSet, basename='user')

routes.register(r'entries', views.ExerciseView)
routes.register(r'bench_entries', views.BenchView)
routes.register(r'squat_entries', views.SquatView)
routes.register(r'deadlift_entries', views.DeadliftView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(routes.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'),)
]

urlpatterns = {
    *routes.urls
}
