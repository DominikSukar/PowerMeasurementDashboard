from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.db.models import Max

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import PowerStations, Circuits, Measurements
from datetime import datetime
import requests
from urllib3.exceptions import MaxRetryError


def get_measurements():
    try:
        data = requests.get("http://localhost:5000").json()
    except MaxRetryError:
        print("Host doesn't respond")

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
# API
@api_view(['GET'])
def get_latest_data(request):
    last_date = Measurements.objects.aggregate(Max('date'))["date__max"]
    measurements = Measurements.objects.filter(date=last_date)

    power_stations_list = PowerStations.objects.values_list('name', flat=True).distinct()
    power_stations = {value: [] for value in power_stations_list}

    for measurement in measurements:
        power_stations[measurement.circuit_id.power_station_id.name].append({
        'id': measurement.id,
        'date': measurement.date,
        'measurement': measurement.measurement,
        'circuit_id': measurement.circuit_id.circuit_name,
        })
    

    return Response(power_stations, status=200)
