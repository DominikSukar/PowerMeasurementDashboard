from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.db.models import Max

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import PowerStations, Circuits, Measurements
from datetime import datetime, timedelta
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

        power_station_object, ps_created = PowerStations.objects.get_or_create(name=power_station_name)
        if ps_created:
            print(f"New power station created {power_station_name}")


        for circuit in data_['measurements']:
            circuit_name = circuit['name']
            m_date = datetime.strptime(circuit['date'], '%a, %d %b %Y %H:%M:%S %Z')
            m_value = circuit['value']

            circuit_object, c_created = Circuits.objects.get_or_create(circuit_name=circuit_name, power_station_id=power_station_object)
            if c_created:
                print(f"New circuit created {circuit_name}, {power_station_name}")
            measurement_object = Measurements.objects.create(circuit_id=circuit_object, date=m_date, measurement=m_value)
# API
@api_view(['GET'])
def get_latest_data(request):
    last_date = Measurements.objects.aggregate(Max('date'))["date__max"]
    measurements = Measurements.objects.filter(date=last_date)

    power_stations_list = PowerStations.objects.values_list('name', flat=True).order_by('name').distinct()
    power_stations = {value: [] for value in power_stations_list}

    for measurement in measurements:
        power_stations[measurement.circuit_id.power_station_id.name].append({
        'date': measurement.date,
        'measurement': measurement.measurement,
        'circuit_id': measurement.circuit_id.circuit_name,
        })

    return Response(power_stations, status=200)

@api_view(['GET'])
def get_circuit_data(request):
    circuit = request.GET.get('circuit', '')
    powerstation = request.GET.get('powerstation', '')

    try:
        date_from = datetime.strptime(request.GET.get('date_from', ''), "%Y-%m-%dT%H:%M")
        date_to = datetime.strptime(request.GET.get('date_to', ''), "%Y-%m-%dT%H:%M")
    except ValueError:
        return Response([], status=404)

    data = []

    try:
        power_station_id = PowerStations.objects.get(name=powerstation)
        circuit_id = Circuits.objects.get(circuit_name=circuit, power_station_id=power_station_id)
    except PowerStations.DoesNotExist or Circuits.DoesNotExist:
        return Response([], status=404)
    measurements = Measurements.objects.filter(circuit_id=circuit_id, date__range=(date_from, date_to)).order_by('date')

    for measurement in measurements:
        data.append({
            "date": measurement.date,
            "value": measurement.measurement
        })
    

    return Response(data, status=200)

@api_view(['GET'])
def get_dashboard_data(request):

    def current_power_consumption():
        max_date = Measurements.objects.aggregate(Max('date'))["date__max"]
        measurements = Measurements.objects.filter(date=max_date)
        current_power_consumption = 0
        for measurement in measurements:
            current_power_consumption += int(measurement.measurement)
        
        return str(current_power_consumption)

    def max_consumption_today():
        unique_values = Measurements.objects.values('date').distinct()
        max_consumption_main = 0
        max_consumption_second = 0
        for value in unique_values:
            measurements = Measurements.objects.filter(date=value['date'])
            for measurement in measurements:
                max_consumption_second += int(measurement.measurement)
            if max_consumption_second > max_consumption_main:
                max_consumption_main = max_consumption_second
            max_consumption_second = 0


        return str(max_consumption_main)

    def combined_power_consumption_today():
        now = datetime.now()
        current_date_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        measurements = Measurements.objects.filter(date__gt=current_date_start)
        combined_power_consumption_today = 0
        for measurement in measurements:
            combined_power_consumption_today += int(measurement.measurement)
        
        return str(combined_power_consumption_today)


    def target_since_yesterday(today_consumption):
        now = datetime.now()
        yesterday = now - timedelta(days=1)
        current_date_start = yesterday.replace(hour=0, minute=0, second=0, microsecond=0)
        measurements = Measurements.objects.filter(date__gt=current_date_start)
        combined_power_consumption_yesterday = 0
        for measurement in measurements:
            combined_power_consumption_yesterday += int(measurement.measurement)
        
        target_since_yesterday = int(today_consumption)/combined_power_consumption_yesterday
        percentage_value = round(target_since_yesterday * 100, 2)
        return str(percentage_value)

    current_power_consumption_value = current_power_consumption()
    max_consumption_today_value = max_consumption_today()
    combined_power_consumption_today_value = combined_power_consumption_today()
    target_since_yesterday_value = target_since_yesterday(combined_power_consumption_today_value)

    data = {
        "current_power_consumption": f"{current_power_consumption_value}W",
        "max_consumption_today": f"{max_consumption_today_value}W",
        "combined_power_consumption_today": f"{combined_power_consumption_today_value}W",
        "target_since_yesterday": f"{target_since_yesterday_value}%",

    }
    return Response(data, status=200)

@api_view(['GET'])
def get_todays_consumption(request):
    data = []
    unique_values = Measurements.objects.values('date').distinct()
    consumption = 0
    for value in unique_values:
        measurements = Measurements.objects.filter(date=value['date']).order_by('date')
        for measurement in measurements:
            consumption += int(measurement.measurement)
        data.append({
                "date": measurement.date,
                "value": consumption
            })
        consumption = 0


    return Response(data, status=200)
