from django.test import TestCase
from ..models import ConnectedDevices, PowerStations, Circuits, Measurements
from django.utils import timezone

class ModelsTestCase(TestCase):

    def setUp(self):
        self.device = ConnectedDevices.objects.create(ip='192.168.1.1', port='8000')
        self.station = PowerStations.objects.create(name='Station A', device=self.device)
        self.circuit = Circuits.objects.create(power_station_id=self.station, circuit_name='Circuit 1', connected_object='Rack 1805')
        self.measurements = Measurements.objects.create(date=timezone.now(), circuit_id=self.circuit, measurement='50')

    def test_connected_devices_creation(self):
        device = ConnectedDevices.objects.get(ip='192.168.1.1', port='8000')
        self.assertEqual(device.ip, '192.168.1.1')
        self.assertEqual(device.port, '8000')

    def test_power_stations_creation(self):
        station = PowerStations.objects.get(name='Station A')
        self.assertEqual(station.name, 'Station A')

    def test_circuits_creation(self):
        circuit = Circuits.objects.get(circuit_name='Circuit 1')
        self.assertEqual(circuit.circuit_name, 'Circuit 1')

    def test_measurements_creation(self):
        measurement = Measurements.objects.get(measurement='50')
        self.assertEqual(measurement.measurement, '50')

    def test_unique_constraint_on_connected_devices_ip_port(self):
        with self.assertRaises(Exception):
            ConnectedDevices.objects.create(ip='192.168.1.1', port='8000')

    def test_unique_constraint_on_power_stations_name(self):
        with self.assertRaises(Exception):
            PowerStations.objects.create(name='Station A', device=self.device)



