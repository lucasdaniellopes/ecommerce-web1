
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import TemplateView, View, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Carrinho, ItemCarrinho
from catalogo.models import Produto

class AdicionarItemView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        produto_id = request.POST.get('produto_id')
        quantidade = int(request.POST.get('quantidade'))

        
        carrinho, created = Carrinho.objects.get_or_create(usuario=request.user)
        produto = get_object_or_404(Produto, id=produto_id)
        
       
        item, created = ItemCarrinho.objects.get_or_create(carrinho=carrinho, produto=produto)
        item.quantidade = quantidade
        total_itens = sum(item.quantidade for item in carrinho.itens.all())
        item.save()

        
        return redirect(request.META.get('HTTP_REFERER', 'produto-list'))

class CarrinhoView(LoginRequiredMixin, TemplateView):
    template_name = "carrinho/carrinho.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        carrinho, created = Carrinho.objects.get_or_create(usuario=self.request.user)
        context['carrinho'] = carrinho
        return context

class RemoverItemView(LoginRequiredMixin, DeleteView):
    model = ItemCarrinho
    success_url = reverse_lazy("carrinho:carrinho")

    def get_object(self, queryset=None):
        carrinho = get_object_or_404(Carrinho, usuario=self.request.user)
        return get_object_or_404(carrinho.itens, id=self.kwargs['pk'])
