from wine.models import Wine
import csv

wine_csv = open('wine.csv', 'r', encoding = "utf-8") 
reader = csv.reader(wine_csv)
headers = next(reader, None)[1:]

for row in reader:  
   wine_dict = {}
   for h, val in zip(headers, row[1:]):
      wine_dict[h] = val
   wine = Wine.objects.create(**wine_dict)

wine_csv.close()  

