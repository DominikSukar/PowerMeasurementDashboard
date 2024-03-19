from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from .models import PowerStations, Circuits, Measurements
from datetime import datetime
import requests

# Create your views here.
def home(request):
    return HttpResponse("100")

def get_measurements():
    data = requests.get("http://localhost:5000").json()
    insert_data(data)
    
def insert_data(data: list) -> None:
    for data_ in data:
        power_station_name = data_['name']
        summarized_measurements = data_['summarizedMeasurements']
        number_of_circuits = data_['numberofCircuits']

        power_station_object, ps_exists = PowerStations.objects.get_or_create(name=power_station_name)

        for circuit in data_['measurements']:
            circuit_name = circuit['name']
            date = datetime.strptime(circuit['date'], '%a, %d %b %Y %H:%M:%S %Z')
            value = circuit['value']

            circuit_object, c_exists = Circuits.objects.get_or_create(circuit_name=circuit_name, power_station_id=power_station_object)
            measurement_object = Measurements.objects.create(circuit_id=circuit_object, date=date, measurement=value)

