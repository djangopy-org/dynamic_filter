from rest_framework import serializers
from .models import Wine

class WineSerializers(serializers.ModelSerializer):
	class Meta:
	    model = Wine
	    fields = ('id', 'description', 'designation', 'country', "taster_name", "title",
	    		'points', 'price', 'province', 'region', 'variety', 'winery')