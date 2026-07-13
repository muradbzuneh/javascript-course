export function formatCurrancy(priceCents){
const productPrice =(Math.round(priceCents) / 100).toFixed(2)
return productPrice;
}