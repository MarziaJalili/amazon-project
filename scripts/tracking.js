import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");

  let matchingOrder;
  orders.forEach(order => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });


  const productIdURL = url.searchParams.get("productId")

  let matchingProduct;
  let matchingProduct2;
  matchingOrder.products.forEach(product => {
    if (product.productId === productIdURL) {
      matchingProduct = product;
    }
    matchingProduct2 = getProduct(productIdURL)
  });
  const orderTimeString = dayjs(matchingProduct.estimatedDeliveryTime).format("dddd MMMM D")
  console.log(matchingProduct2);

  // for the progress element
  const today = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const trackingHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${orderTimeString}
      </div>

      <div class="product-info">
        ${matchingProduct2.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingProduct.quantity}
      </div>

      <img class="product-image" src=${matchingProduct2.image}>

      <div class="progress-labels-container">
        <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''
    }">
          Preparing
        </div>
        <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
    }">
          Shipped
        </div>
         <div class="progress-label ${percentProgress >= 100 ? "current-status" : ''
    }">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
       <div class="progress-bar" style="width: ${percentProgress}%;"></div>
      </div>
    </div>
`;

  document.querySelector(".js-main").innerHTML = trackingHTML;

  document.querySelector(".search-button").addEventListener("click", () => {
    window.location.href = "index.html"
  })
}
loadPage();