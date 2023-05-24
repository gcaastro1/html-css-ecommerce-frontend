let acessory = []
let shoes    = []
let shirts   = []

// Função para separar os itens por categoria

function separateCategories(){
    for(let i = 0; i < data.length; i++){
        if(data[i].tag[0] === 'Camisetas'){
            shirts.push(data[i])
        } else if(data[i].tag[0] === 'Calçados'){
            shoes.push(data[i])
        } else if(data[i].tag[0] === 'Acessórios'){
            acessory.push(data[i])
        }
    }
}

separateCategories()

function postItens(prodCat){
    
    let ul = document.getElementById('products')

    let child  = ul.lastElementChild

    while (child) {
        ul.removeChild(child)
        child  = ul.lastElementChild
    }
    
    if(prodCat.length <= 0) {
        let h3       = document.createElement('h3')
        let li       = document.createElement('li')
        li.className = 'no-search'
        h3.className = 'no-search-results'
        h3.innerText = `Nenhum produto encontrado.`
        li.appendChild(h3)
        ul.appendChild(li)
    }

    for(let i = 0; i < prodCat.length; i++){
        // Definindo as tags que serão usadas
        let li                = document.createElement('li')
        let divImg            = document.createElement('div')
        let img               = document.createElement('img')
        let divProd           = document.createElement('div')
        let category          = document.createElement('span')
        let title             = document.createElement('h4')
        let description       = document.createElement('span')
        let price             = document.createElement('span')
        let button            = document.createElement('button')

        // Adicionando classes e atributos
        li.className          = 'product-card'
        divImg.className      = 'img-content'
        img.className         = 'product-img'
        divProd.className     = 'card-content'
        category.className    = 'product-ctgy'
        title.className       = 'product-title'
        description.className = 'product-dscpt'
        price.className       = 'product-price'
        button.className      = 'add-cart'
        button.setAttribute('id', `product-${prodCat[i].id}`)

        // Adicionando textos
        img.src               = `${prodCat[i].img}`
        category.innerText    = `${prodCat[i].tag[0]}`
        title.innerText       = `${prodCat[i].nameItem}`
        description.innerText = `${prodCat[i].description}`
        price.innerText       = `R$ ${prodCat[i].value.toFixed(2)}`
        button.innerText      = `${prodCat[i].addCart}`

        // Postando na tela
        divImg.appendChild(img)
        divProd.appendChild(category)
        divProd.appendChild(title)
        divProd.appendChild(description)
        divProd.appendChild(price)
        divProd.appendChild(button)
        li.appendChild(divImg)
        li.appendChild(divProd)
        ul.appendChild(li)
    }
    
    addCartButton()

}

postItens(data)


// FUNÇÃO PARA ADICIONAR E REMOVER PRODUTOS DO CARRINHO DE COMPRA

let cartCount = 0
let cartPrice = 0

function addCartButton(){
    const cartButton = document.getElementsByClassName('add-cart')
    //console.log(cartButton)
    //console.log(cartButton[0].id.substring(12))
    for(let i = 0; i < cartButton.length; i++){
        let button = cartButton[i]
    
        button.addEventListener('click', function(e){
            let idButton = e.target.id
            let id = parseInt(idButton.substring(8))
    
            let product = searchProduct (id)
            console.log(idButton)
            if(!product){
                alert('Este produto não está cadastrado.')
            } else {
                if(!cartVerify(product.id)){
                    alert('O Produto já está no carrinho')
                } else {
                    addToCart(product)
                    verifyCartEmpty(cartCount, cartPrice)
                }
            }
    
        })
    }
}


function searchProduct(search){
    for(let i = 0; i < data.length; i++){
        let product = data[i]
        if(product.id == search){
            return product
        }
    }
    return false
}

function cartVerify(id){
    let product = document.getElementById(`product-${id}`)
    if(product == null){
        return false
    } else {
        return true
    }
}

function cartVerifyRepeat(id){
    let product = document.getElementById(`cart-${id}`)
    if(product == null){
        return false
    } else {
        return true
    }
}

function addToCart(product){
    if(cartVerifyRepeat(product.id)){
        alert('O produto já está no carrinho')
    } else {
        cartCount++
        cartPrice += product.value

        let cartList = document.getElementsByClassName('cart-content')

        // Variaveis para criar os itens
        let li     = document.createElement('li')
        let img    = document.createElement('img')
        let div    = document.createElement('div')
        let h4     = document.createElement('h4')
        let span   = document.createElement('span')
        let button = document.createElement('button')

        // Adicionando classes e atributos
        li.id = `cart-${product.id}`
        li.className     = 'cart-product'
        img.src          = product.img
        img.className    = 'pcart-img'
        div.className    = 'product-info'
        h4.className     = 'pcart-title'
        h4.innerText     = `${product.nameItem}`
        span.className   = 'pcart-price'
        span.innerText   = `R$ ${product.value.toFixed(2)}`
        button.className = 'pcart-button'
        button.innerText = `Remover do carrinho`

        button.addEventListener('click', function(e){
            let li = document.getElementById(`cart-${product.id}`)
            li.remove()
            cartCount--
            cartPrice -= product.value
            verifyCartEmpty(cartCount, cartPrice)
        })

        div.appendChild(h4)
        div.appendChild(span)
        div.appendChild(button)
        li.appendChild(img)
        li.appendChild(div)
        cartList[0].appendChild(li)
    } 

}


function verifyCartEmpty(count, value){
    let cartFooter   = document.getElementsByClassName('cart-footer')
    let cartProducts = document.getElementsByClassName('cart-content')
    let cartEmpty    = document.getElementsByClassName('cart-product-empty')

    if(cartProducts[0].childElementCount != 1){
        cartFooter[0].classList.remove('hidden')
        cartEmpty[0].classList.add('hidden')

        let qty   = document.getElementsByClassName('itens-quantity')
        let price = document.getElementsByClassName('total-value')

        qty[0].innerText   = `${count}`
        price[0].innerText = `R$ ${value.toFixed(2)}`

    } else if(cartProducts[0].childElementCount == 1){
        cartFooter[0].classList.add('hidden')
        cartEmpty[0].classList.remove('hidden')
    }
}

verifyCartEmpty()