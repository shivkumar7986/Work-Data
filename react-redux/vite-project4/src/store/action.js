export const AddToCart = (product)=>({
    type: 'PRODUCT/ADD',
    payload: product
})

export const RemoveProduct = (id) => ({
    type: 'PRODUCT/REMOVE',
    payload: id,
  });

 export const IncrementQty = (id) => ({
    type: 'INCREMENT/QUANTITY',
    payload: id,
  });


  export const DecrementQty = (id) => ({
    type: 'DECREMENT/QUANTITY',
    payload: id,
  });