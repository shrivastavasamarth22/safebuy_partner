export const ADD_QTY_TO_CART = 'ADD_QTY_TO_BAG';
export const REMOVE_QTY_FROM_CART = 'REMOVE_QTY_FROM_CART';
export const ADD_PURCHASE_PRICE_TO_CART = 'ADD_PURCHASE_PRICE_TO_CART';


export const addQtyToCart = item => {
    return {
        type: ADD_QTY_TO_CART,
        item
    }
}

export const removeQtyFromCart = itemId => {
    return {
        type: REMOVE_QTY_FROM_CART,
        id: itemId
    }
}

export const addPurchasePriceToCart = (itemId, newPrice) => {
    return {
        type: ADD_PURCHASE_PRICE_TO_CART,
        id: itemId,
        newPrice
    }
}