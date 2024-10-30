from django.http import JsonResponse
from django.shortcuts import render
from project.models import project,team_members
from django.contrib.auth.models import User

# Create your views here.

# To save project in DB
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
    if request.method=='POST':
        print(9999999999999999999999999999999999)
        # Check project id and get member
        global project_id
        project_id = request.POST.get('project_id')
        print(project_id)

        user_email_list = {}
        try: #To show email_ID in dropdown
            if project.objects.filter(project_id=project_id):
                existing_user = User.objects.filter(is_staff = False)
                for user_email in existing_user:
                    user_email_list[user_email.email]=user_email.username
                print(user_email_list)
                return JsonResponse({'user_email': user_email_list})
        except:
            return JsonResponse({'status': 'error'}, status = 403)



def project_team_save(request):
    print(77777)
    if request.method=='POST':
        #for data storing in DB
        print(2222222222222222222222222222)
        mname=request.POST.get('mname')
        position=request.POST.get('position')
        id=request.POST.get('id')
        mobile=request.POST.get('mobile')
        mem_email=request.POST.get('email')
        print(mname,position,id,mobile,mem_email,1122222222222333333333)
        projectID=project.objects.get(project_id=id)
        try :
            if mname and position and id and mobile and mem_email:
                print(2222222222222222222222222222)
                team_member_data=team_members(
                    name=mname,
                    position=position,
                    project_id=projectID,
                    mobile=mobile,
                    email=mem_email,
                )
                team_member_data.save()
                return JsonResponse({'status':'Member data Inserted'})
            else:
                return JsonResponse({'status':'Please enter all member details'})
        except:
            import traceback
            print(traceback.format_exc())
            return JsonResponse({'status':'Please enter all member details'})
    else:
        return JsonResponse({'status':'request method is not post'}) 