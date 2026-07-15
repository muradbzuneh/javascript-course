import {products} from '../data/products.js'
import {formatCurrancy} from '../utils/money.js'
import {cart, cartQuantity, safeToLocalStorage} from '../data/cart.js'

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class = "js-product-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>
      <div class="added-to-cart js-add-to-cart-text-${product.id}" data->
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;
let timeoutId = {};
  
export function updateQuantity(productId){
let selector = document.querySelector(`.js-product-selector-${productId}`)
let messagee = document.querySelector(`.js-add-to-cart-text-${productId}`)
  messagee.classList.add("added")
    clearTimeout(timeoutId[productId])
   timeoutId[productId] =setTimeout(()=>{
    messagee.classList.remove("added")
  }, 2000)
  
let cartNum =  Number(selector.value)
  let matchingItem;
  cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
 if (matchingItem) {
    matchingItem.quantity +=cartNum
  } else {
cart.push({
 productId: productId,
   quantity: cartNum,
   deliveryOptionId:1
     });
   }
safeToLocalStorage()
  }
   
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    updateQuantity(productId);
    cartQuantity();
    });
  });