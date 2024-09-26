let section = document.querySelector('.cards-list')
let cartList = []

function listProducts(productList, secao) {
    secao.innerHTML = ""


    for (let i = 0; i < productList.length; i++) {
        let product = productList[i]

        let card = createProductCard(product)

        secao.appendChild(card)
    }


}



function createProductCard(product) {

    imgTag = document.createElement('img')
    divTag = document.createElement('div')
    divTag2 = document.createElement('div')
    categoryTag = document.createElement('span')
    titleTag = document.createElement('h1')
    descriptionTag = document.createElement('p')
    priceTag = document.createElement('strong')
    btnTag = document.createElement('button')
    liTag = document.createElement('li')


    imgTag.src = product.img
    imgTag.alt = product.nameItem
    imgTag.classList.add('card-img')
    divTag.classList.add('card-img-container')
    categoryTag.innerText = product.tag
    categoryTag.classList.add('card-category')
    titleTag.innerText = product.nameItem
    titleTag.classList.add('card-title')
    descriptionTag.innerText = product.description
    descriptionTag.classList.add('card-description')
    priceTag.innerText = `R$ ${product.value}.00`
    priceTag.classList.add('card-price')
    btnTag.innerText = product.addCart
    btnTag.classList.add('card-add-cart')
    btnTag.setAttribute('id', product.id)
    liTag.classList.add('card')

    divTag.appendChild(imgTag)
    liTag.appendChild(divTag)
    divTag2.appendChild(categoryTag)
    divTag2.appendChild(titleTag)
    divTag2.appendChild(descriptionTag)
    divTag2.appendChild(priceTag)
    divTag2.appendChild(btnTag)
    liTag.appendChild(divTag2)

    return liTag


}


function menuInputListener(productList,section){
    menuList = document.querySelector('.menu-list')

    menuList.addEventListener("click", interceptMenu)
}



function interceptMenu(event) {
    let menuItem = event.target;

    if (menuItem.tagName == "BUTTON") {
        let menuInput = menuItem.innerText;

        if (menuInput === "Todos") {
            listProducts(data, section);
        } else {
            let menuResult = categorySearchEngine(menuInput, data);
            listProducts(menuResult, section);
        }
    }
}


function categorySearchEngine(input,list){
    let searchResult = []

    
    for (let i = 0; i < list.length; i++) {
        if (input == list[i].tag) {
            searchResult.push(list[i])
            
        }
    }

    return searchResult
}

function search(productList, section) {
    let btnSearch = document.querySelector('.btnSearch');  // Seleciona o botão de busca
    let txtSearch = document.querySelector('.txtSearch');  // Seleciona o campo de texto

    btnSearch.addEventListener("click", function () {
        let searchInput = txtSearch.value.trim();  // Pega o valor da busca e remove espaços em branco
        if (searchInput !== "") {  // Verifica se o campo de busca não está vazio
            let searchResult = searchEngine(searchInput, productList);  // Busca produtos pelo nome
            listProducts(searchResult, section);  // Lista os produtos encontrados
        }
    });
}



function searchEngine(searchValue, productList) {
    let searchResult = [];
    let normalizedSearchValue = searchValue.toLowerCase();  // Converter a entrada de busca para minúsculas

    for (let i = 0; i < productList.length; i++) {
        let normalizedProductName = productList[i].nameItem.toLowerCase();  // Converter o nome do produto para minúsculas
        if (normalizedProductName.includes(normalizedSearchValue)) {  // Verificar se o nome do produto contém o valor da busca
            searchResult.push(productList[i]);
        }
    }

    return searchResult;  // Retorna os resultados da busca
}


function showcaseListener() {
    let showcase = document.querySelector('.cards-list')

    showcase.addEventListener("click", interceptShowcase)
}



function interceptShowcase(event) {

    let btn = event.target

    if (btn.tagName == "BUTTON") {

        let idProduct = btn.id

        let product = data.find(function (product) {
            if (product.id == idProduct) {

                return product
            }
        })

        addCart(product)
        quantityBox(cartList)
        sum(cartList)
    }
}

function addCart(prd) {
    let carrinho = document.querySelector('div .cart-list')
    
    cartList.push(prd)
    listCart(cartList, carrinho)
    
    
    //filterToCart()
}

function listCart(list,section){
    document.querySelector('.cart-list').innerHTML = ""
    for(let i = 0; i < list.length; i++){
        let product = list[i]

        let card = createShoppingCard(product)

        section.appendChild(card)
    }
}

function createShoppingCard(product){
    imgTag = document.createElement('img')
    divTag = document.createElement('div')
    divTag2 = document.createElement('div')
    titleTag = document.createElement('h1')
    priceTag = document.createElement('strong')
    btnTag = document.createElement('button')
    liTag = document.createElement('li')


    imgTag.src = product.img
    imgTag.alt = product.nameItem
    imgTag.classList.add('card-img')
    divTag.classList.add('card-img-container')
    titleTag.innerText = product.nameItem
    titleTag.classList.add('card-title')
    priceTag.innerText = `R$ ${product.value}.00`
    priceTag.classList.add('card-price')
    btnTag.innerText = "Remover"
    btnTag.classList.add('card-add-cart')
    btnTag.setAttribute('id', product.id)
    liTag.classList.add('card')


    divTag.appendChild(imgTag)
    liTag.appendChild(divTag)
    divTag2.appendChild(titleTag)
    divTag2.appendChild(priceTag)
    divTag2.appendChild(btnTag)
    liTag.appendChild(divTag2)

    return liTag

}

function cartListener(list) {
    let cart = document.querySelector('.cart-list')

    cart.addEventListener("click", interceptCart)

}


function interceptCart(event){
    let btn = event.target
    
    if(btn.tagName == "BUTTON"){
        removeCart(btn)
        quantityBox(cartList)
        sum(cartList)
        
    }
}

function removeCart(button){
    let carrinho = document.querySelector('div .cart-list')
    btn = button.id

    for(let i = 0; i < cartList.length; i++){
        if(cartList[i].id == btn){
         cartList.splice(i, 1)
         listCart(cartList, carrinho)
         return
        }
    }
    
    
    
    
}

function quantityBox(array){

    if(array.length == 1 && document.querySelector('.cart-box') == null){
        let cartContainer = document.querySelector('.cart')
        let box = createQuantityBox(array)
        cartContainer.appendChild(box)
    } else if(array.length == 0 && document.querySelector('.cart-box') != null){
        let cartContainer = document.querySelector('.cart')
        document.querySelector('.cart-box').innerHTML = ''
        emptyCardText()
 
        
    } 
   



}

function createQuantityBox(array){
    cartBox = document.createElement('div')
    divTag = document.createElement('div')
    totalDiv = document.createElement('div')
    quantityText = document.createElement('p')
    quantityValue = document.createElement('span')
    totalText = document.createElement('p')
    totalValue = document.createElement('span')

    quantityText.innerText = "Quantidade:"
    quantityText.classList.add('quantityText')
    quantityValue.innerText = `${array.length}`
    quantityValue.classList.add('quantityValue')
    totalText.innerText = "Total:"
    totalText.classList.add('totalText')
    totalValue.innerText = ""
    totalValue.classList.add('totalValue')
    cartBox.classList.add('cart-box')
    totalDiv.classList.add('total-div')


    divTag.append(quantityText, quantityValue)
    totalDiv.append(totalText, totalValue)
    cartBox.append(divTag,totalDiv)

    return cartBox
}

function sum(cart){
    let total = 0
    let quant = 0
    let txtquant = document.querySelector('.quantityValue')
    let txtTotal = document.querySelector('.totalValue')
    for(let i = 0; i < cart.length; i++){
        total += cart[i].value
        quant++
    }
    txtquant.innerText = `${quant}`
    txtTotal.innerText = `R$ ${total}.00`


}

function sub(cart){
    let total = 0
    let quant = 0
    let txtquant = document.querySelector('.quantityValue')
    let txtTotal = document.querySelector('.totalValue')
    for(let i = 0; i < cart.length; i++){
        total -= cart[i].value
        quant--
    }
    txtquant.innerText = `${quant}`
    txtTotal.innerText = `R$ ${total}.00`
}
function emptyCardText(){

    cartList = document.querySelector('.cart-list')
    cartList.innerHTML = ""
    emptyCard = document.createElement('p')
    addItens =  document.createElement('span')

     emptyCard.innerText = "Carrinho vazio"
     addItens.innerText = "Adicione itens"

     cartList.append(emptyCard, addItens)
}


showcaseListener()
listProducts(data, section)
menuInputListener(data,section)
search(data,section)
cartListener(cartList)