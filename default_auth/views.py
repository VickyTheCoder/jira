from django.http import JsonResponse
from django.contrib.auth import models

def signup(request):
    if request.method == 'POST':
        user = request.POST['userid']
        pwd1 = request.POST['pwd1']
        pwd2 = request.POST['pwd2']
        email = request.POST['email']
        mobile = request.POST['mobile']

        if pwd1!=pwd2:
            return JsonResponse({'status':'Password not matched'})
        else:
            try:
                usr = models.User.objects.get(username=user)
                return JsonResponse({'status':'User already Exists'})
            except:
                user = models.User.objects.create_user(
                    username=user, 
                    password=pwd1,
                    email=email,
                    id=mobile,
                    )
                return JsonResponse({'status':f'Username {user} is created'})

