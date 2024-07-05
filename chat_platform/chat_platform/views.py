from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import render, redirect
from django.conf import settings

def login(request):
    print('function calling')
    if request.method == 'POST':
        username = request.POST.get('user_name')
        password = request.POST.get('password')
    
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            if user.user_type == 'employee':
                print('this is the  employee')
                return redirect('/gymfrontend')  # Replace with the URL for employee dashboard
        else:
            # Return an 'invalid login' error message
            return render(request, 'login.html', {'error_message': 'Invalid email or password'})
    else:
        return render(request, 'login.html')
