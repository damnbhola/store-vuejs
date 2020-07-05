from .serializers import MobileSerializer, LaptopSerializer
from ..models import Mobile, Laptop
from rest_framework import viewsets


class MobileViewSet(viewsets.ModelViewSet):
    queryset = Mobile.objects.all()
    serializer_class = MobileSerializer


class LaptopViewSet(viewsets.ModelViewSet):
    queryset = Laptop.objects.all()
    serializer_class = LaptopSerializer
