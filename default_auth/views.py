from django.http import JsonResponse
from django.contrib.auth import models
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
    