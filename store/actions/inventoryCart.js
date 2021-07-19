export const TOGGLE_SELECTED_ITEM = 'TOGGLE_SELECTED_ITEM';
export const UPDATE_PURCHASE_QTY = 'UPDATE_PURCHASE_QTY';
export const UPDATE_PURCHASE_PRICE = 'ADD_PURCHASE_PRICE';
export const UPDATE_SELLING_PRICE = 'UPDATE_SELLING_PRICE'


export const toggleSelectedItem = item => {
    return {
        type: TOGGLE_SELECTED_ITEM,
        item
    }
}


export const updatePurchaseQty = (itemId, newQty) => {
    return {
        type: UPDATE_PURCHASE_QTY,
        id: itemId,
        newQty
    }
}

export const updatePurchasePrice = (itemId, newPrice) => {
    return {
        type: UPDATE_PURCHASE_PRICE,
        id: itemId,
        newPrice
    }
}

export const updateSellingPrice = (itemId, newPrice) => {
    return {
        type: UPDATE_SELLING_PRICE,
        id: itemId,
        newPrice
    }
}