export const cart = [];

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
            quantity: quantity
        })
    };

}