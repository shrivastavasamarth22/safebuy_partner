import {TOGGLE_SELECTED_ITEM, UPDATE_PURCHASE_QTY, UPDATE_PURCHASE_PRICE, UPDATE_SELLING_PRICE} from "../actions/inventoryCart";
import {Inventory, InventoryItem} from "../../models";

const randomId = () => {
    return Math.random().toString(36).substr(2, 4).toUpperCase();
}

const initialState = {
    inventoryCart: new Inventory(
        randomId(),
        [],
        new Date().toDateString(),
        0,
        0
    )
}

export default (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_SELECTED_ITEM:
            const { item } = action
            const found = state.inventoryCart.inventoryItems.find(i => i.itemId === item.itemId);
            if (!!found) {
                const updatedInventory = state.inventoryCart
                updatedInventory.inventoryItems = updatedInventory.inventoryItems.filter(i => i.itemId !== item.itemId);
                return {
                    ...state,
                    inventoryCart: updatedInventory
                }
            } else {
                const newItem = new InventoryItem({
                    ...action.item,
                    purchasePrice: 0,
                    purchaseQty: 0,
                    sellingPrice: 0
                })
                const updatedInventory = state.inventoryCart
                updatedInventory.inventoryItems.push(newItem);
                return {
                    ...state,
                    inventoryCart: updatedInventory
                }
            }

        default:
            return state;
    }
}