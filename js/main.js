
var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var searchInput = document.getElementById('searchInput');
var addBtn = document.getElementById('addBtn');
var inputs = document.getElementsByClassName('form-control');
var currentIndex=0;


var products = [];

if (JSON.parse(localStorage.getItem('productsList')) != null) {
    products = JSON.parse(localStorage.getItem('productsList'));
    displayData()
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == 'add product') {  
        addProduct();
    }
    else { 
        updateProduct()
    }
    displayData();
    clearForm();
}
function addProduct() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    products.push(product);
    localStorage.setItem('productsList', JSON.stringify(products))
}
function displayData() {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        cartona += `<tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].desc}</td>
                <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>update</button></td>
                <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
               </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartona
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayData();
    localStorage.setItem('productsList', JSON.stringify(products))
}
function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
}

searchInput.onkeyup = function () {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            cartona += `<tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>update</button></td>
            <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
           </tr>`
        }

    }
    document.getElementById('tableBody').innerHTML = cartona
}
function getProductInfo(index) {
    currentIndex=index;
    var currentProduct = products[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescInput.value = currentProduct.desc;
    addBtn.innerHTML = 'update product';

}
function updateProduct(){
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    products[currentIndex]=product;
    localStorage.setItem('productsList', JSON.stringify(products))
    addBtn.innerHTML = 'add product';
}

