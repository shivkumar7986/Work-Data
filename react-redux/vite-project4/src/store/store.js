import { createStore } from 'redux'



const initialState = {
    products: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCT/ADD':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'PRODUCT/REMOVE':
            return {
                ...state,
                products: state.products.filter((product) =>
                    product.id !== action.payload
                )
            }

        case 'INCREMENT/QUANTITY':
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload ? { ...product, productQty: product.productQty + 1 } : product)
            }

        case 'DECREMENT/QUANTITY':
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload && product.productQty > 1
                        ? { ...product, productQty: product.productQty - 1 }
                        : product)
            }
        default: return state;
    }
}

const store = createStore(reducer);

export default store;
