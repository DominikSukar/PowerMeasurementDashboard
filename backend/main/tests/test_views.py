from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from ..models import ConnectedDevices, PowerStations, Circuits, Measurements
from django.utils import timezone

class DevicesViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_get_devices(self):
        response = self.client.get('/devices/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_device(self):
        data = {'ip': '192.168.1.1', 'port': '8080'}
        response = self.client.post('/devices/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ConnectedDevices.objects.count(), 1)

    def test_post_device_invalid_data(self):
        data = {'ip': '192.168.1.1'}
        response = self.client.post('/devices/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_devices(self):
        response = self.client.delete('/devices/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class LatestDataViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_get_latest_data(self):
        response = self.client.get('/latest-data/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)        