from django.db import models

class Region(models.Model):
    name = models.CharField(max_length=400)


class City(models.Model):
    name = models.CharField(max_length=400)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()


class Monument(models.Model):
    name = models.TextField()
    description = models.TextField()
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    image_url = models.TextField(blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
