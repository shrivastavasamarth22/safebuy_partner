import {ADD_ITEMS} from "../actions/inventoryCart";
import {ADD_INVENTORY} from "../actions/inventory";


const initialState = {
    inventoryCart: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_ITEMS: {
            let updatedCart = state.inventoryCart;
            updatedCart = action.items
            return {
                ...state,
                inventoryCart: updatedCart
            }
        }

        case ADD_INVENTORY: {
            return initialState;
        }

        default:
            return state;
    }
}