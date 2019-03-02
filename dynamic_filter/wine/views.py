from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from .serializers import WineSerializers
from .models import Wine
from .pagination import StandardResultsSetPagination


def WineList(request):
	return render(request, "wine.html", {})


class WineListing(ListAPIView):
	pagination_class = StandardResultsSetPagination
	serializer_class = WineSerializers

	def get_queryset(self):
		queryList = Wine.objects.all()
		country = self.request.query_params.get('country', None)
		variety = self.request.query_params.get('variety', None)
		province = self.request.query_params.get('province', None)
		region = self.request.query_params.get('region', None)
		sort_by = self.request.query_params.get('sort_by', None)

		if country:
		    queryList = queryList.filter(country = country)
		if variety:
		    queryList = queryList.filter(variety = variety)
		if province:
		    queryList = queryList.filter(province = province)
		if region:
		    queryList = queryList.filter(region = region)    

		if sort_by == "price":
		    queryList = queryList.exclude(price__isnull=True).\
		        exclude(price__exact='').order_by("price")
		elif sort_by == "points":
		    queryList = queryList.exclude(points__isnull=True).\
		        exclude(points__exact='').order_by("points")
		return queryList


def getCountries(request):
    if request.method == "GET" and request.is_ajax():
        countries = Wine.objects.exclude(country__isnull=True).\
            exclude(country__exact='').order_by('country').values_list('country').distinct()
        countries = [i[0] for i in list(countries)]
        data = {
            "countries": countries, 
        }
        return JsonResponse(data, status = 200)


def getvariety(request):
    if request.method == "GET" and request.is_ajax():
        variety = Wine.objects.exclude(variety__isnull=True).\
        	exclude(variety__exact='').order_by('variety').values_list('variety').distinct()
        variety = [i[0] for i in list(variety)]
        data = {
            "variety": variety, 
        }
        return JsonResponse(data, status = 200)


def getProvince(request):
    if request.method == "GET" and request.is_ajax():
        country = request.GET.get('country')
        province = Wine.objects.filter(country = country).\
            	exclude(province__isnull=True).exclude(province__exact='').\
            	order_by('province').values_list('province').distinct()
        province = [i[0] for i in list(province)]
        data = {
            "province": province, 
        }
        return JsonResponse(data, status = 200)


def getRegion(request):
    if request.method == "GET" and request.is_ajax():
        province = request.GET.get('province')
        region = Wine.objects.filter(province = province).\
                exclude(region__isnull=True).exclude(region__exact='').values_list('region').distinct()
        region = [i[0] for i in list(region)]
        data = {
            "region": region, 
        }
        return JsonResponse(data, status = 200)


