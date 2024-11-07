from django.urls import path
from .views import CarrinhoView, AdicionarItemView, RemoverItemView
from . import views

app_name = 'carrinho'

urlpatterns = [
    path('', CarrinhoView.as_view(), name='carrinho'),
    path('adicionar/', AdicionarItemView.as_view(), name='adicionar_item'),
    path('remover/<int:pk>/', RemoverItemView.as_view(), name='remover_item'),
    path('', views.CarrinhoView.as_view(), name='ver_carrinho'),
]
