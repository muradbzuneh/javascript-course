
export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
   productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
   quantity: 1
  }
  ];
  
export function safeToLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function cartQuantity(){
   let cartQuantity = 0;
      cart.forEach((item) => {
      cartQuantity += item.quantity;
      });
      
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  document.querySelector('.return-to-home-link').innerHTML = cartQuantity

}

export function removeFromCart(productId){
  let newCart = [];
  cart.forEach((cartItem) =>{
    if(productId !== cartItem.productId){
    newCart.push(cartItem)
    }
  })
 cart = newCart; 
 safeToLocalStorage()
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem) =>{
     if(productId === cartItem.productId){
       cartItem.quantity = newQuantity;
     }
  })
  safeToLocalStorage()
}
