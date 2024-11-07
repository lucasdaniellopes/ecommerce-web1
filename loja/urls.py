from django.urls import path
from .views import ProdutoListView, ProdutoDetailView, search_products

urlpatterns = [
    path('produtos/', ProdutoListView.as_view(), name='produto-list'),
    path('produtos/<int:pk>/', ProdutoDetailView.as_view(), name='produto-detail'),
    path('produtos/search/', search_products, name='produto-search'),
]



