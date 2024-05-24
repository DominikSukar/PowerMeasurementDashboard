from django.urls import path
from .views import *

urlpatterns = [
    path('latest_data/', LatestData.as_view(), name='latest_data'),
    path('circuit_data/', CircuitData.as_view(), name='circuit_data'),
    path('dashboard_data/', DashboardData.as_view(), name='dashboard_data'),
    path('todays_consumption/', TodaysConsumption.as_view(), name='todays_consumption'),
    path('devices/', Devices.as_view(), name='devices')
]