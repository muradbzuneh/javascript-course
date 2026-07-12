import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../data/cart.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOps} from '../data/deliveryOps.js'
import {formatCurrancy} from '../utils/money.js'
import {products} from '../data/products.js'
const today = dayjs()
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
  let cartDeliveryId = cartItem.deliveryOptionId
  let deliveryOption;
  let deliveryDate
deliveryOps.forEach((option) => {
  if (option.deliveryOpsId === cartItem.deliveryOptionId) {
    deliveryOption = option;
  }
});
if (deliveryOption) {
  deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
}
  
  orderSummary +=`<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate.format('MMM dddd D')}
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
              ${deliveryOptionss(matchingItem, cartItem)}
              </div>
            </div>
          </div> `;
});

document.querySelector('.js-order-summary').innerHTML = orderSummary

function deliveryOptionss(matchingItem, cartItem){
  let html = ''
  deliveryOps.forEach((deliveryOption) => {
  const isChecked = deliveryOption.deliveryOpsId === cartItem.deliveryOptionId
  const today = dayjs()
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
  const deliveryPrice = deliveryOption.priceCents === 0 ? 'Free-':`$${formatCurrancy(deliveryOption.priceCents)}-`
  html += `<div class="delivery-option js-delivery-option"
  data-product-id = "${matchingItem.id}"
  data-delivery-option-id = "${deliveryOption.deliveryOpsId}">
                  <input type="radio"
                    ${isChecked ? 'checked' : '' }
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                    >
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate.format('dddd MMM D')}
                    </div>
                    <div class="delivery-option-price">
                      ${deliveryPrice} Shipping
                    </div>
                  </div>
                </div>`
  })
 return html
}
 document.querySelectorAll('.js-delivery-option').forEach((element) =>{
    element.addEventListener('click', ()=>{
   const { productId, deliveryOptionId } = element.dataset
  updateDeliveryOption(productId, deliveryOptionId)
  })
  })
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
}
orderSummaryFun()