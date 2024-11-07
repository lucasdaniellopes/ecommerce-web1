import os
import django
from django.utils.text import slugify

# Configura o ambiente Django para acessar os modelos
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'weartake_django.settings')
django.setup()

from catalogo.models import Produto, Categoria

# Apaga todos os produtos existentes
Produto.objects.all().delete()
print("Todos os produtos foram apagados.")

# Dados dos produtos com o caminho de imagem atualizado
data = [
    {
        "id": 1,
        "img": "loja/img/jaqueta.svg",  # Caminho dentro da pasta static
        "nameItem": "Lightweight Jacket",
        "description": "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
        "value": 100,
        "tag": ["camisetas"],
    },
    {
        "id": 2,
        "img": "loja/img/gorro.svg",
        "nameItem": "Black Hat",
        "description": "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
        "value": 100,
        "tag": ["acessorios"],
    },
    {
        "id": 3,
        "img": "loja/img/mascara.svg",
        "nameItem": "Mask",
        "description": "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
        "value": 40,
        "tag": ["acessorios"],
    },
    {
        "id": 4,
        "img": "loja/img/camiseta_preta.svg",
        "nameItem": "T-Shirt",
        "description": "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
        "value": 100,
        "tag": ["camisetas"],
    },
    {
        "id": 5,
        "img": "loja/img/camiseta_branca.svg",
        "nameItem": "Short-Sleeve T-Shirt",
        "description": "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
        "value": 100,
        "tag": ["camisetas"],
    },
    {
        "id": 6,
        "img": "loja/img/moletom.svg",
        "nameItem": "Champion Packable Jacket",
        "description": "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
        "value": 100,
        "tag": ["camisetas"],
    },
]

# Popula o banco de dados
for item in data:
    # Define o nome e slug da categoria
    categoria_nome = item["tag"][0]
    categoria_slug = slugify(categoria_nome)  # Gera um slug único baseado no nome

    # Obtém ou cria a categoria com o slug e nome
    categoria, created = Categoria.objects.get_or_create(
        nome=categoria_nome,
        slug=categoria_slug  # Inclui o slug nos critérios de busca
    )

    # Cria o produto com o caminho da imagem em static/loja/img
    Produto.objects.create(
        nome=item["nameItem"],
        descricao=item["description"],
        preco=item["value"],
        estoque=10,  # Define um valor padrão para o estoque, ajuste conforme necessário
        categoria=categoria,
        imagem=item["img"]  # Caminho da imagem em static/loja/img
    )

print("Produtos adicionados com sucesso!")
