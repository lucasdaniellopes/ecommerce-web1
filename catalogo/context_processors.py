from .models import Categoria

def categorias_disponiveis(request):
    return {'categorias': Categoria.objects.all()}
