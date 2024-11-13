from django.http import JsonResponse
from django.contrib.auth import models
from django.contrib import auth


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

def signin(request):
    user=request.POST.get('username')
    password=request.POST.get('password')
    print(user,password)

    # user_check=models.User.objects.filter(username=user)
    # password_check=models.User.objects.filter(password=password)

    # if user in user_check and password in password_check:
    auth_user=auth.authenticate(username=user,password=password)    
    print(auth_user)

    if auth_user: 
        auth.login(request=request,user=auth_user)
        print(11111111111)
        return JsonResponse({'status':f'{user} logged In successfully','username':user})
    else:
        return JsonResponse({'status':'Authentication Failed'})

# user logout
def user_logout(request):
    if request.user.is_authenticated:
        print('yesssssssssssssssss')
        auth.logout(request)
        print('lllllllllllllllllllllll')
        return JsonResponse({'status':'user logged out','reload':True})
    else:
        return JsonResponse({'status':'error'})

        