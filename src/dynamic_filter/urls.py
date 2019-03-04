from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include

urlpatterns = [
    path('admin/', admin.site.urls),
	url(r"^wine/", include(("wine.urls", "wine"), namespace = "wine"))
]
