export const ADD_INVENTORY = 'ADD_INVENTORY';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'

export const addInventory = (items, transportCost, totalAmount) => {
    return {
        type: ADD_INVENTORY,
        items,
        transportCost,
        totalAmount
    }
}

export const updateInventory = (id, items) => {
    return {
        type: UPDATE_INVENTORY,
        id,
        items
    }
}