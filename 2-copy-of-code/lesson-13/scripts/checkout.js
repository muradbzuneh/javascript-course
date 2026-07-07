import {cart, removeFromCart, updateQuantity} from '../data/cart.js'
import {formatCurrancy} from '../utils/money.js'
import {products} from '../data/products.js'
let orderSummary = '';
let matchingItem = '';


function orderSummaryFun(){
cart.forEach((cartItem)=>{
  const productId = cartItem.productId
  products.forEach((product) =>{
    if(productId === product.id){
      matchingItem = product;
    }
  });
  orderSummary +=`<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

           <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrancy(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <input type="
                   number" class = "quantity-input js-quantity-input-${matchingItem.id}" />
                  <span class = "save-quantity-link link-primary" data-product-id ="${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> `;
});
}
orderSummaryFun()
document.querySelector('.js-order-summary').innerHTML = orderSummary
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`)
     container.remove()
     updateQuantityCart()
  });
});
document.querySelectorAll('.js-update-link').forEach((link) =>{
  link.addEventListener('click', ()=>{
    let productId = link.dataset.productId
   let container = document.querySelector(`.js-cart-item-container-${productId}`);
   container.classList.add("is-quantity-editing")
  })
})

document.querySelectorAll('.save-quantity-link').forEach((link) =>{
  link.addEventListener('click', ()=>{
    let productId = link.dataset.productId;
  let container = document.querySelector(`.js-cart-item-container-${productId}`);
   container.classList.remove("is-quantity-editing")
   let inputElem = document.querySelector(`.js-quantity-input-${productId}`);
   let inpVal = Number(inputElem.value)
   updateQuantity(productId, inpVal)
   updateQuantityCart()
   document.querySelector(`.js-quantity-label-${productId}`).innerHTML = inpVal;
  })
})

function updateQuantityCart(){
  let cartQuantity = 0;
      cart.forEach((item) => {
      cartQuantity += item.quantity;
      });
  document.querySelector('.return-to-home-link').innerHTML = cartQuantity+'items'
}
updateQuantityCart()