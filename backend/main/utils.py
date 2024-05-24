import requests
from urllib3.exceptions import MaxRetryError
from .models import ConnectedDevices, PowerStations, Circuits, Measurements
from datetime import datetime, timedelta

import logging

logger = logging.getLogger(__name__)

def get_measurements():
    devices = ConnectedDevices.objects.all()
    ip_addresses = [f"{device.ip}:{device.port}" for device in devices]
    for ip_address in ip_addresses:
        try:
            data = requests.get(f"http://{ip_address}").json()
        except MaxRetryError:
            logger.error("Host doesn't respond")

        insert_data(data)
    
def insert_data(data: list) -> None:
    for data_ in data:
        power_station_name = data_['name']
        summarized_measurements = data_['summarizedMeasurements']
        number_of_circuits = data_['numberofCircuits']

        power_station_object, ps_created = PowerStations.objects.get_or_create(name=power_station_name)
        if ps_created:
            logger.info(f"New power station created {power_station_name}")


        for circuit in data_['measurements']:
            circuit_name = circuit['name']
            m_date = datetime.strptime(circuit['date'], '%a, %d %b %Y %H:%M:%S %Z')
            m_value = circuit['value']

            circuit_object, c_created = Circuits.objects.get_or_create(circuit_name=circuit_name, power_station_id=power_station_object)
            if c_created:
                logger.debug(f"New circuit created {circuit_name}, {power_station_name}")
            measurement_object = Measurements.objects.create(circuit_id=circuit_object, date=m_date, measurement=m_value)


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
    
    try:
        target_since_yesterday = int(today_consumption)/combined_power_consumption_yesterday
    except ZeroDivisionError:
        target_since_yesterday = 0
    percentage_value = round(target_since_yesterday * 100, 2)
    return str(percentage_value)
