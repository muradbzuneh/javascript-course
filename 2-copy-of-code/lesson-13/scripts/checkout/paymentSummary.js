import {cart} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import {getDeliveryOps} from '../../data/deliveryOps.js'
import {formatCurrancy} from '../../utils/money.js'
 let paymentSummaryHTML = '';
export function paymentSummary(){
let productPerCents = 0;
let shippingPrice = 0;
  cart.forEach((cartItem) =>{
    const productId = cartItem.productId
    const matchingItem = getProduct(productId)
    productPerCents += matchingItem.priceCents * cartItem.quantity
    const deliveryOptionId = cartItem.deliveryOptionId
  const deliveryOption = getDeliveryOps(deliveryOptionId)
   shippingPrice += deliveryOption.priceCents
  })
  const PriceBeforeTax = productPerCents + shippingPrice
  const tax = PriceBeforeTax * 0.1
  const totalPrice = PriceBeforeTax + tax
  paymentSummaryHTML = `
       <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrancy(productPerCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrancy(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrancy(PriceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrancy(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div class="payment-summary-money"></div>
            <div>Order total:$${formatCurrancy(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button> `
          
document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}