from django.http import JsonResponse
from django.contrib.auth import models
from django.contrib.auth import authenticate, login
# Create your views here.

def signup(request):
    userid = request.POST.get('userid')
    pwd1 = request.POST.get('pwd1')
    pwd2 = request.POST.get('pwd2')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')

    if pwd1!=pwd2:
        return JsonResponse({'status':'Passwords Mismatched'})
    else:
        try:
            usr=models.User.objects.get(username=userid)
            print(usr,233333)
            return JsonResponse({'status':f'User already Exists({userid})'})

        except:
            print(23331)
        user = models.User.objects.create_user(
            username=userid,
            password=pwd1,
            email=email,
            id=mobile,
        )
        print(f'{userid} created')
        return JsonResponse({'status':f'{userid} created'})
    
def signin(request):
    user=request.POST.get('username')
    password=request.POST.get('password')
    print(user,password)
    auth_user=authenticate(username=user,password=password)    
    print(auth_user)

    if auth_user:
        login(request=request,user=auth_user)
        return JsonResponse({'status':f'{auth_user} logged In successfully'})
    else:
        return JsonResponse({'status':'Authentication Failed'})