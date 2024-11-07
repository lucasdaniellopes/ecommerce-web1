from django.http import JsonResponse
from django.views.generic import ListView, DetailView, TemplateView
from catalogo.models import Produto
from django.contrib.auth.mixins import LoginRequiredMixin


class ProdutoListView(LoginRequiredMixin, ListView):
    model = Produto
    template_name = 'loja/produto_list.html'
    context_object_name = 'produtos'
    
    def get_paginate_by(self, queryset):
        return self.request.GET.get('paginate_by', 10)

    def get_queryset(self):
        queryset = Produto.objects.all().order_by('nome')
        categoria = self.request.GET.get('categoria')
        search_query = self.request.GET.get('q')  

        if categoria:
            queryset = queryset.filter(categoria__nome__iexact=categoria)
        if search_query:  
            queryset = queryset.filter(nome__icontains=search_query)
        
        return queryset
    

class ProdutoDetailView(LoginRequiredMixin, DetailView):
    model = Produto
    template_name = 'loja/produto_detail.html'
    context_object_name = 'produto'


def search_products(request):
    search_term = request.GET.get('q', '')
    produtos = Produto.objects.filter(nome__icontains=search_term).select_related('categoria').values('id', 'nome', 'descricao', 'preco', 'imagem')
    return JsonResponse(list(produtos), safe=False)