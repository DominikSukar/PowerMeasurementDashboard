from django.urls import path
from . import views

urlpatterns = [
    path('get_latest_data/', views.get_latest_data, name='get_latest_data'),
    path('get_circuit_data/', views.get_circuit_data, name='get_circuit_data'),
    path('get_dashboard_data/', views.get_dashboard_data, name='get_dashboard_data'),
    path('get_todays_consumption/', views.get_todays_consumption, name='get_todays_consumption'),
    path('get_devices/', views.get_devices, name='get_devices'),
    path('post_devices/', views.post_devices, name='post_devices'),
    path('delete_data/', views.delete_data, name='delete_data')
]