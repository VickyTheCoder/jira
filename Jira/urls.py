"""
URL configuration for Jira project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from UI import views as ui_views
from default_auth import views as auth_views
from project import views as pro_views
urlpatterns = [
    path('', ui_views.homepage),
    path('auth/signup', auth_views.signup),
    path('auth/signin', auth_views.signin),
    path('project/details',pro_views.project_page),
    path('project/team',pro_views.project_team),
    path('project/team/save',pro_views.project_team_save),
]
