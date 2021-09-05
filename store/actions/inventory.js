export const ADD_INVENTORY = 'ADD_INVENTORY';

export const addInventory = (items, transportCost, totalAmount) => {
    return {
        type: ADD_INVENTORY,
        items,
        transportCost,
        totalAmount
    }
}