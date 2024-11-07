from django.urls import reverse_lazy
from django.shortcuts import redirect
from django.urls import reverse
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from contas.forms import CustomUserCreationForm

class RegisterView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login") 
    template_name = "contas/register.html"

class CustomLoginView(LoginView):
    template_name = "contas/login.html"


def redirect_to_login(request):
    return redirect(reverse("login"))

