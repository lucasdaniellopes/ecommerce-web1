from django.urls import path
from .views import ProdutoListView, ProdutoDetailView, search_products

urlpatterns = [
    path('', ProdutoListView.as_view(), name='produto-list'),  
    path('produto/<int:pk>/', ProdutoDetailView.as_view(), name='produto-detail'),  
    path('search/', search_products, name='search_products'),  #
]



