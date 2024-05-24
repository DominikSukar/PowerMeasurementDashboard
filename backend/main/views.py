from django.db.models import Max
from utils import current_power_consumption, max_consumption_today, combined_power_consumption_today, target_since_yesterday

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ConnectedDevices, PowerStations, Circuits, Measurements
from datetime import datetime

from .serializers import ConnectedDevicesSerializer

import logging

logger = logging.getLogger(__name__)

class Devices(APIView):
    def get(request):
        devices = ConnectedDevices.objects.all()
        serializer = ConnectedDevicesSerializer(devices, many=True)

        return Response(serializer.data, status=200)

    def post(request):
        ip = request.data.get('ip')
        port  = request.data.get('port')

        if ip and port:
            device = ConnectedDevices(ip=ip, port=port)
            device.save()
        else:
            return Response("Please provide both ip and port", status=400)

        return Response(status=200)

    def delete(request):
        ConnectedDevices.objects.all().delete()
        PowerStations.objects.all().delete()
        Circuits.objects.all().delete() 
        Measurements.objects.all().delete()

        return Response(status=200)

class LatestData(APIView):
    def get(request):
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

class CircuitData(APIView):
    def get(request):
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

class DashboardData(APIView):
    def get(request):
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

class TodaysConsumption(APIView):
    def get(request):
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
