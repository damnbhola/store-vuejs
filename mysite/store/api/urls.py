from .views import MobileViewSet, LaptopViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('mobile', MobileViewSet, basename='mobiles')
router.register('laptop', LaptopViewSet, basename='laptops')
urlpatterns = router.urls
