class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [{
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

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        // select
        const select = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(select.value);
        let matchingItem;

        this.cartItems.forEach(item => {
            if (productId === item.productId) {
                matchingItem = item
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            })
        };

        this.saveToStorage();
    }

    addToCartTest(productId) {
        let matchingItem;

        this.cartItems.forEach(item => {
            if (productId === item.productId) {
                matchingItem = item
            }
        });

        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            })
        };

        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach(cartItem => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem)
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach(item => {
            cartQuantity += item.quantity;
        });
        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem;
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem
            }
        });
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

}


const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");



console.log(cart)
console.log(businessCart)
console.log(businessCart instanceof Cart)

















