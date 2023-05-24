// FUNÇÕES PARA PESQUISA DE PRODUTO

function searchItem(product){
    let dataSearch = []
    for(let i = 0; i < data.length; i++){
        let item = data[i]
        if(item.nameItem.toLowerCase().includes(product.toLowerCase())){
            dataSearch.push(item)
        }
    }
    console.log(dataSearch)
    return dataSearch 
}

const searchButton = document.getElementsByClassName('search-button')

searchButton[0].addEventListener('click', function(event){
    let ul     = document.getElementById('products')
    //console.log(ul.lastElementChild)
    let search = document.getElementById('search')
    let value  = search.value
    let post   = searchItem(value)
    
    let child  = ul.lastElementChild

    while (child) {
        ul.removeChild(child)
        child  = ul.lastElementChild
    }

    console.log(post)


    if(post[0] != false){
        return postItens(post)
    } else {
        let h3       = document.createElement('h3')
        let li       = document.createElement('li')
        li.className = 'no-search'
        h3.className = 'no-search-results'
        h3.innerText = `Nenhum produto encontrado.`
        li.appendChild(h3)
        ul.appendChild(li)
    }
    
})