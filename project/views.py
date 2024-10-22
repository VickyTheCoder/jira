from django.http import JsonResponse
from django.shortcuts import render
from project.models import project,team_members

# Create your views here.

def project_page(request):
    if request.method=='GET':
        return render(request,'index.html')
    
    elif request.method=='POST':
        project_name=request.POST.get('name')
        description=request.POST.get('description')
        count=request.POST.get('count')
        pid=request.POST.get('pid')
        budget=request.POST.get('budget')
        print(project_name,description,count,pid,budget,111)
        user=project(project_name=project_name,project_desc=description,project_members_count=count,project_id=pid,project_budget=budget)
        user.save()
        status="Project created succesfully"
        return JsonResponse({'status':status})

def project_team(request):
    return JsonResponse("Hello Team member")