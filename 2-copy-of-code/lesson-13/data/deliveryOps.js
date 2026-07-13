export function getDeliveryOps(deliveryOptionId){
  let deliveryOption;
deliveryOps.forEach((option) => {
  if (deliveryOptionId === option.deliveryOpsId) {
    deliveryOption = option;
  }
});
return deliveryOption || deliveryOption[0]
}


export const deliveryOps = [
  {
    deliveryOpsId: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  deliveryOpsId: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  deliveryOpsId: '3',
  deliveryDays: 1,
  priceCents: 999
}
];