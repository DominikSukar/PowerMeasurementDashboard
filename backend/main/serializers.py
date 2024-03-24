from rest_framework.serializers import ModelSerializer
from main.views import ConnectedDevices


class ConnectedDevicesSerializer(ModelSerializer):
    class Meta:
        model = ConnectedDevices
        fields = '__all__'