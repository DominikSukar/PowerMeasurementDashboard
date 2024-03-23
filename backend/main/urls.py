from django.urls import path
from . import views

urlpatterns = [
    path('get_latest_data/', views.get_latest_data, name='get_latest_data'),
    path('get_circuit_data/', views.get_circuit_data, name='get_circuit_data'),
]