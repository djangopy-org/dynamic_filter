from django.db import models

class Wine(models.Model):
	country = models.CharField(max_length = 100)
	designation = models.CharField(max_length = 200, null = True)
	description = models.TextField(null = True)
	points = models.CharField(max_length = 20, null = True)
	price = models.CharField(max_length = 20, null = True)
	province = models.CharField(max_length = 100, null = True)
	region = models.CharField(max_length = 150, null = True)
	taster_name = models.CharField(max_length = 120, null = True)
	title = models.CharField(max_length = 200, null = True)
	variety = models.CharField(max_length = 150, null = True)
	winery = models.CharField(max_length = 150, null = True)

	def __str__(self):
		return self.title

