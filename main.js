class Cart {
    constructor() {
        this.cart = [];
        this.total = 0;
    }

    addToCart(id, title, price, image) {
        const modifiedTitle = title.replace(/['"]/g, ''); // Eliminar comillas simples y dobles
        const item = { id, title: modifiedTitle, price, image };
        this.cart.push(item);
        this.total += price;
        this.updateCart();
    }

    removeFromCart(id) {
        const itemIndex = this.cart.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            this.total -= this.cart[itemIndex].price;
            this.cart.splice(itemIndex, 1);
            this.updateCart();
        }
    }

    updateCart() {
        const cartList = document.getElementById('cart');
        cartList.innerHTML = '';

        this.cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" style="max-width: 50px; max-height: 50px;">
                ${item.title} - $${item.price}
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
            `;
            cartList.appendChild(cartItem);
        });

        const totalSpan = document.getElementById('total');
        totalSpan.textContent = this.total.toFixed(2);
    }
}

const apiUrl = 'https://fakestoreapi.com';

const cart = new Cart();

async function getAllProducts() {
    try {
        const response = await fetch(`${apiUrl}/products`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

async function getProductDetails(productId) {
    try {
        const response = await fetch(`${apiUrl}/products/${productId}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error al cargar detalles del producto:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        // Eliminar caracteres especiales del título
        const modifiedTitle = product.title.replace(/['"]/g, ''); // Eliminar comillas simples y dobles

        const productCol = document.createElement('div');
        productCol.classList.add('col-md-4', 'mb-4');
        productCol.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${modifiedTitle}">
                <div class="card-body">
                    <h5 class="card-title">${modifiedTitle}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, '${modifiedTitle}', ${product.price}, '${product.image}')">Agregar al carrito</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCol);
    });
}

async function addToCart(productId, title, price, image) {
    const product = await getProductDetails(productId);
    if (product) {
        cart.addToCart(product.id, product.title, product.price, product.image);
    }
}

function removeFromCart(productId) {
    cart.removeFromCart(productId);
}

getAllProducts();
