from django.db import models

# Create your models here.
class PowerStations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

class Circuits(models.Model):
    circuit_name = models.AutoField(primary_key=True)
    power_station_id = models.ForeignKey(PowerStations, on_delete=models.CASCADE, null=True)
    circuit_name = models.CharField(max_length=100)
    connected_object = models.CharField(max_length=100)

class Measurements(models.Model):
    measurement_id = models.AutoField(primary_key=True)
    date = models.DateField(auto_now_add=True)
    circuit_id = models.ForeignKey(Circuits, on_delete=models.CASCADE, null=True)
    measurement = models.CharField(max_length=100)