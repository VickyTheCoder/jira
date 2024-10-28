from django.db import models

# Create your models here.



class project(models.Model):
    project_name=models.CharField(max_length=77)
    project_desc=models.TextField(max_length=200)
    project_members_count=models.IntegerField()
    project_id=models.IntegerField(primary_key=True)
    project_budget=models.IntegerField()
 
class team_members(models.Model):
    name=models.CharField(max_length=78)
    position=models.CharField(max_length=78)
    email=models.EmailField(primary_key=True)
    project_id=models.ForeignKey(project,on_delete=models.CASCADE)
    mobile=models.IntegerField()

