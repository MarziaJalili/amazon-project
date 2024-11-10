import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";



export function renderOrderSummary() {
    updateCartQuantity();
    let cartSummaryHTML = '';

    cart.forEach(cartItem => {
        const productId = cartItem.productId;

        // retrive the data from the product array using the id
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDay = today.add(
            deliveryOption.deliveryDays, "days"
        ).format("dddd, MMMM D");



        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${deliveryDay}
            </div>
    
            <div class="cart-item-details-grid">
            <img class="product-image" src=${matchingProduct.image}>
    
            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary 
                js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input 
                class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span 
                class="save-quantity-link link-primary
                js-save-quantity-link-${matchingProduct.id}
                "
                data-product-id="${matchingProduct.id}"
                >Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>
    
            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
            </div>
        </div>
        `;

    });


    document.querySelector(".js-order-summary")
        .innerHTML = cartSummaryHTML;

    // delete links
    document.querySelectorAll(".js-delete-link")
        .forEach(link => {
            link.addEventListener("click", () => {
                const productId = link.dataset.productId;

                // remove it from the cart using the external function
                removeFromCart(productId);

                // retrieve the cart item that you will delete and remove it from the dome
                const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
                updateCartQuantity();
                renderOrderSummary();
                renderPaymentSummary();
            });
        });


    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();

        document.querySelector(".js-cart-items-count")
            .innerHTML = `${cartQuantity} items`;
    }


    document.querySelectorAll(`.js-update-quantity-link`)
        .forEach(link => {
            link.addEventListener("click", () => {
                const productId = link.dataset.productId;
                // get the relevant item container and add the class to it to be applies to all 
                const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
                cartItem.classList.add("is-editing-quantity");
            })
        });

    document.querySelectorAll(".save-quantity-link")
        .forEach(link => {
            link.addEventListener("click", () => {
                const productId = link.dataset.productId;
                // get the relevant item container it disappear
                const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
                cartItem.classList.remove("is-editing-quantity");

                // get the input element to save the new quantity
                const input = document.querySelector(`.js-quantity-input-${productId}`);
                const newQuantity = Number(input.value);

                if (newQuantity < 0 || newQuantity >= 1000) {
                    alert("Quantity must be at least 0 and less than 1000")
                    return;

                }
                updateQuantity(productId, newQuantity);
                // get the quantity span 
                document.querySelector(`.quantity-label-${productId}`).innerHTML = newQuantity;
                updateCartQuantity();
                renderPaymentSummary();
            })
        });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = "";
        deliveryOptions.forEach(deliveryOption => {
            const today = dayjs();
            const deliveryDay = today.add(
                deliveryOption.deliveryDays, "days"
            ).format("dddd, MMMM D");

            const priceString = deliveryOption.priceCents === 0
                ? "FREE"
                : `${formatCurrency(deliveryOption.priceCents)} - `;
            html += `<div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"        
                data-delivery-option-id="${deliveryOption.id}"        
            >
                <input type="radio" 
                  ${deliveryOption.id === cartItem.deliveryOptionId ? "checked" : ""}
                  class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${deliveryDay}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>  
                    </div>
                </div>
    
            `
        });
        return html;
    };

    document.querySelectorAll(".js-delivery-option")
        .forEach(element => {
            element.addEventListener("click", () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        })
}


