class Cart {
    constructor() {
        //Recupero el carrito desde el localStorage (si existe)
        const storedCart = localStorage.getItem('cart');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
        this.cart = [];
        this.total = 0;
    }
    addToCart(id, title, price, image) {
        const item = { id, title, price, image };
        this.cart.push(item)
        this.total += price;
        this.updateCart();
        this.saveToLocalStorage();
    }

    removeFromCart(id) {
        const index = this.cart.findIndex(product => product.id = id);
        if (index !== -1) {
            this.total -= this.cart[index].price;
            this.cart.splice(index, 1);
            this.updateCart();
            this.saveToLocalStorage();
        }
    }

    updateCart() {
        const cartList = document.getElementById('cart');
        cartList.innerHTML = "";
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

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}

const cart = new Cart();

const mockProducts = [
    { id: 1, title: 'REMERA CON LOGO EN EL PECHO', price: 19.99, image: 'https://calvinargentina.vteximg.com.br/arquivos/ids/180228-650-709/2535I64292_430_1.jpg?v=637987751359400000' },
    { id: 2, title: 'Calvin Klein Mens Chill Short Sleeve Crew Neck', price: 29.99, image: 'https://m.media-amazon.com/images/I/81LCqXmlyLL._AC_UL1500_.jpg' },
    { id: 3, title: '2 Pack Remera Cuello Redondo Regular Fit', price: 19.99, image: 'https://calvinargentina.vteximg.com.br/arquivos/ids/184941-650-709/J30J320199_ACF_1.jpg?v=638212314385500000' },
    { id: 4, title: 'REMERA BASICA VERDE CACTUS', price: 6.99, image: 'https://acdn.mitiendanube.com/stores/252/220/products/b0c16e0c-aecd-40ad-bdbe-45fa130ff3ea-a99cfcae1af73ba7a416935080957011-1024-1024.webp' },
    { id: 5, title: 'REMERA SIN MANGAS', price: 39.99, image: 'https://calvinargentina.vteximg.com.br/arquivos/ids/192142-650-709/J20J218262_XL1_1.jpg?v=638310010172130000' },
    { id: 6, title: 'REMERA DE MUJER', price: 41.99, image: 'https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dwd593e1dc/TF2562_7SY_24.jpg?imwidth=915&impolicy=product' },
    { id: 7, title: 'REMERA CON LOGO', price: 39.99, image: 'https://calvinargentina.vteximg.com.br/arquivos/ids/191595-650-709/J30J320624_YAF_1.jpg?v=638307574424630000' },
    { id: 8, title: 'REMERA MANGA CORTA DE CUELLO REDONDO Y LOGO', price: 11.99, image: 'https://calvinargentina.vteximg.com.br/arquivos/ids/192122-650-709/40HM878_540_1.jpg?v=638310009851400000' },

];

async function getAllProducts() {
    displayProducts(mockProducts);
}

async function getProductDetails(productId) {
    return mockProducts.find(product => product.id = productId);
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCol = document.createElement('div');
        productCol.classList.add('col-md-4', 'mb-4');
        productCol.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Agregar al carrito</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCol);
    });
}


function addToCart(productId, title, price, image) {
    cart.addToCart(productId, title, price, image);
}

function removeFromCart(productId) {
    cart.removeFromCart(productId);
}

getAllProducts();
