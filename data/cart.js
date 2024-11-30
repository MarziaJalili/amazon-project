export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}



function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    // select
    const select = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(select.value);
    let matchingItem;

    cart.forEach(item => {
        if (productId === item.productId) {
            matchingItem = item
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        })
    };

    saveToStorage();
}

export function addToCartOrder(productId) {
    let matchingItem;

    cart.forEach(item => {
        if (productId === item.productId) {
            matchingItem = item
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        })
    };

    saveToStorage();
}




export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach(cartItem => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    });
    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem
        }
    });
    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}


export function loadCart(fun) {
    const xml = new XMLHttpRequest();
    xml.addEventListener("load", () => {
        console.log(xml.response);

        fun();
    });

    xml.open("GET", "https://supersimplebackend.dev/cart");
    xml.send();
}


export function loadCartFetch() {
    const promise = fetch(
        "https://supersimplebackend.dev/cart"
    ).then(response => {
        return response.text();
    }).then(textData => {
        console.log(textData)
    });
    return promise;
}

