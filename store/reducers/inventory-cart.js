import {ADD_ITEMS, UPDATE_PURCHASE_QTY, UPDATE_PURCHASE_PRICE, UPDATE_SELLING_PRICE} from "../actions/inventoryCart";
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
        case ADD_ITEMS: {
            const updatedCart = state.inventoryCart;
            let updatedItems = updatedCart.inventoryItems;
            updatedItems = action.items;
            updatedCart.inventoryItems = updatedItems;

            return {
                ...state,
                inventoryCart: updatedCart
            }

        }

        default:
            return state;
    }
}