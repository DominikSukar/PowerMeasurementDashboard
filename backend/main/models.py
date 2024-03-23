from django.db import models

# Create your models here.
class PowerStations(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"ps_name: {self.name}, PS_ID: {self.id}"

class Circuits(models.Model):
    id = models.AutoField(primary_key=True)
    power_station_id = models.ForeignKey(PowerStations, on_delete=models.CASCADE)
    circuit_name = models.CharField(max_length=100)
    connected_object = models.CharField(max_length=100)

    def __str__(self):
        return f"circuit_name: {self.circuit_name}, {self.power_station_id}"

class Measurements(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    circuit_id = models.ForeignKey(Circuits, on_delete=models.CASCADE)
    measurement = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.measurement}W {self.circuit_id}"
    