export const ADD_ITEMS_TO_STOCK = 'ADD_ITEM_TO_STOCK';

export const addItemsToStock = (items) => {
    return {
        type: ADD_ITEMS_TO_STOCK,
        items,
    }
}
