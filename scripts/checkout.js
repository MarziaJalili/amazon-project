import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import "../data/cart-class.js"
// import "../data/car.js";
// import "../data/backend-practice.js"

async function loadPage() {
    await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
    ]);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
async function loadPage() {
    try {
        // throw "error1"

        await loadProductsFetch();
        // await loadCartFetch();

        const value = await new Promise((resolve, reject) => {
            // throw "error2";
            loadCart(() => {
                // reject("error3")
                resolve();
            })
        })

    } catch (error) {
        console.log("Unexpected error. Please try again later.")
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
*/

/*
Promise.all([
    loadProductsFetch(),
    loadCartFetch(),
]).then((values) => {
    console.log(values)
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/




/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve("value1");
    });

}).then((value) => {
    console.log(value)
    return new Promise((resolve) => {
  ;      loadCart(() => {
            resolve();
        })
    })

}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});

*/





/*
loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/



