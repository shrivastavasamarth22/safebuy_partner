export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';


export const addItemToCart = itemId => {
    return {
        type: ADD_ITEM_TO_CART,
        id: itemId
    }
}

export const removeItemToCart = itemId => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        id: itemId
    }
}