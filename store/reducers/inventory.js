import {ADD_INVENTORY} from "../actions/inventory";
import {Inventory} from "../../models";

const initialState = {
    inventory: []
}

const randomId = () => {
    return Math.random().toString(36).substr(2, 4).toUpperCase();
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_INVENTORY: {
            const updatedInventory = new Inventory({
                id: randomId(),
                inventoryItems: action.items,
                transportationCost: action.transportCost,
                totalAmount: action.totalAmount
            })
            const updatedInventoryArray = [...state.inventory, updatedInventory];

            return {
                ...state,
                inventory: updatedInventoryArray
            }

        }

        default:
            return state
    }
}