from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include

app_name = [
	"wine",
]

urlpatterns = [
    path('admin/', admin.site.urls),
	url(r'^api-auth/', include(('rest_framework.urls', "rest_framework"), namespace='rest_framework')),
	url(r"^wine/", include(("wine.urls", "wine"), namespace = "wine"))
]
