export const ADD_ITEMS_TO_STOCK = 'ADD_ITEM_TO_STOCK';
export const UPDATE_STOCK = 'UPDATE_STOCK';

export const addItemsToStock = (items) => {
    return {
        type: ADD_ITEMS_TO_STOCK,
        items,
    }
}

export const updateStock = (newStock) => {
    return {
        type: UPDATE_STOCK,
        newStock
    }
}
