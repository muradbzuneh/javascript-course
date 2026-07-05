export function formatCurrancy(priceCents){
const productPrice =  (priceCents / 100).toFixed(2)
return productPrice;
}