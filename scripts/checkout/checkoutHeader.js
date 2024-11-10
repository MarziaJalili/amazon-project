import { calculateCartQuantity } from "../../data/cart.js"

export function renderCheckoutHeader() {
    const cartQuantity = calculateCartQuantity();
    const checkoutHeaderHTML = `
        Checkout (<a class="return-to-home-link js-cart-items-count js-cart-items-count" href="index.html">${cartQuantity} items</a>)
    `
    document.querySelector(".js-checkout-header-middle-section").innerHTML = checkoutHeaderHTML;
}