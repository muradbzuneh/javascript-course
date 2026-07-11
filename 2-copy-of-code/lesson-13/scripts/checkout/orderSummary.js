import {cart, removeFromCart, updateQuantity} from '../data/cart.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions} from '../data/delivery-options.js'
console.log('Imported:', deliveryOptions);
import {formatCurrancy} from '../utils/money.js'
import {products} from '../data/products.js'
const today = dayjs()
let orderSummary = '';
let matchingItem = '';

export function orderSummaryFun(){
cart.forEach((cartItem)=>{
  const productId = cartItem.productId
  products.forEach((product) =>{
    if(productId === product.id){
      matchingItem = product;
    }
  });
  const cartDeliveryId = cartItem.id
  let deliveryOption;
  let deliveryDate
 deliveryOptions.forEach((option) =>{
   if(option.id = cartDeliveryId){
     deliveryOption = option
   }
   deliveryDate = today.add(option.deliveryDays, 'days')
 })
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
return orderSummary
}

function deliveryOptionss(matchingItem, cartItem){
  let html = ''
  deliveryOptions.forEach((deliveryOption) => {
     const isChecked = deliveryOption.id === cartItem.deliveryOptionId
  console.log(deliveryOption)
  console.log(deliveryOption.id )
   console.log(cartItem.deliveryOptionId)
  const today = dayjs()
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
  const deliveryPrice = deliveryOption.priceCents === 0 ? 'Free-':`$${formatCurrancy(deliveryOption.priceCents)}-`
  html += ` <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                    ${isChecked ? 'checked' : '' }>
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
