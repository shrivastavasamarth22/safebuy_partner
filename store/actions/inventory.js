export const ADD_INVENTORY = 'ADD_INVENTORY';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'

export const addInventory = (items, transportCost, totalAmount, shopId) => {
    return {
        type: ADD_INVENTORY,
        items,
        transportCost,
        totalAmount,
        shopId
    }
}

export const updateInventory = (id, items) => {
    return {
        type: UPDATE_INVENTORY,
        id,
        items
    }
}