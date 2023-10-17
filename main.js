let cart;

document.addEventListener("DOMContentLoaded", function () {
    cart = new Cart();
    getCategories();
    getAllProducts();
});

class Cart {
    constructor() {
        // Recupero el carrito desde el localStorage (si existe)
        const storedCart = localStorage.getItem('myCart');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
        this.total = 0;

        this.calculateTotal();
        this.updateCart();
    }

    addToCart(id, title, price, image) {
        const item = { id, title, price, image };
        this.cart.push(item);
        this.total += price;
        this.updateCart();
        this.saveToLocalStorage();
    }

    removeFromCart(id) {
        const index = this.cart.findIndex(product => product.id === id);
        if (index !== -1) {
            this.total -= this.cart[index].price;
            this.cart.splice(index, 1);
            this.updateCart();
            this.saveToLocalStorage();
        }
    }

    updateCart() {
        const cartList = document.getElementById('cart-list-modal');
        cartList.innerHTML = '';
        this.cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" style="max-width: 50px; max-height: 50px;">
                ${item.title} - $${item.price.toFixed(2)}
                <button class="btn btn-danger remove-from-cart" data-id="${item.id}" data-price="${item.price}">Eliminar</button>
            `;
            cartList.appendChild(cartItem);
        });

        const cartTotalDiv = document.getElementById('cart-total-modal');
        cartTotalDiv.textContent = `Total: $${this.total.toFixed(2)}`;
    }

    saveToLocalStorage() {
        localStorage.setItem('myCart', JSON.stringify(this.cart));
    }

    calculateTotal() {
        this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
    }

    openCartModal() {
        $('#cartModal').modal('show');
    }

    closeCartModal() {
        $('#cartModal').modal('hide');
    }

    checkout() {
        this.cart = [];
        this.total = 0;
        this.updateCart();
        this.closeCartModal();
    }
}

const apiUrl = 'https://fakestoreapi.com';

async function getCategories() {
    try {
        const response = await fetch(`${apiUrl}/products/categories`);
        const categories = await response.json();
        const categorySelect = document.getElementById('categorySelect');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });


    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

async function getAllProducts(category = '') {
    try {
        let url = `${apiUrl}/products`;
        if (category) {
            url += `/category/${category}`;
        }

        const response = await fetch(url);
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
        // Limitar el título a 20 caracteres para evitar que se desalinien las cards
        const limitedTitle = product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title;

        const productCol = document.createElement('div');
        productCol.classList.add('col-md-4', 'mb-4');
        productCol.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-fixed-height" alt="${limitedTitle}">
                <div class="card-body">
                    <h5 class="card-title">${limitedTitle}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Agregar al carrito</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCol);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const title = button.getAttribute('data-title');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            cart.addToCart(productId, title, price, image);
            Swal.fire({
                title: 'Producto Agregado',
                text: `Se ha agregado "${title}" al carrito.`,
                icon: 'success',
                timer: 1500,  // Auto-cierre después de 1.5 segundos
                showConfirmButton: false
            });
        });
    });
}

function removeCartItem(e) {
    if (e.target.tagName === 'BUTTON') {
        const productId = e.target.getAttribute('data-id');
        cart.removeFromCart(productId);
    }
}

async function handleCategoryChange() {
    const selectElement = document.getElementById('categorySelect');
    const selectedCategory = selectElement.value;
    await getAllProducts(selectedCategory); 
}


document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list-modal');
    cartList.addEventListener('click', removeCartItem);
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        cart.checkout();
    });
});

const openCartButton = document.getElementById('cart-button');
openCartButton.addEventListener('click', () => {
    cart.openCartModal();
});



