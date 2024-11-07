from carrinho.models import Carrinho

def cart_item_count(request):
    if request.user.is_authenticated:
        try:
            carrinho = Carrinho.objects.get(usuario=request.user)
            total_quantidade = sum(item.quantidade for item in carrinho.itens.all())
        except Carrinho.DoesNotExist:
            total_quantidade = 0
    else:
        total_quantidade = 0

    return {'cart_item_count': total_quantidade}
