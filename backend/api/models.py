from django.db import models

# Create your models here.

class Country(models.Model):
    name = models.CharField(unique=True, max_length= 100)
    created = models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ClubType(models.Model):
    name = models.CharField(unique=True, max_length= 100)
    created = models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class League(models.Model):
    name = models.CharField(unique=True, max_length= 100)
    created = models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Characteristic(models.Model):
    name = models.CharField(unique=True, max_length= 100)
    created = models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class FootballClub(models.Model):
    name = models.CharField(unique=True, max_length= 100)
    owner_name = models.CharField(unique=True, max_length=100, null=True)
    description = models.CharField(max_length=1000)
    attendance = models.IntegerField(null=True)
    founded_year = models.IntegerField(null=True)
    city = models.CharField(max_length = 100)
    home_stadium = models.CharField(max_length=100, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete = models.CASCADE)
    clubtype = models.ForeignKey(ClubType, on_delete = models.CASCADE, null=True)
    characteristic = models.ManyToManyField(Characteristic)
    created= models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name