import {ADD_ITEMS_TO_STOCK} from "../actions/stockList";
import StockItem from "../../models/stock-item";

const initialState = {
    stockList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEMS_TO_STOCK: {
            const newList = [...state.stockList];
            const {items} = action;

            items.forEach(item => {
                const found = newList.find(i => i.itemId === item.itemId);
                if (!!found) {
                    const foundIndex = newList.findIndex(i => i.itemId === item.itemId);
                    newList[foundIndex].qty += found.purchaseQty
                } else {
                    const newItem = new StockItem({
                        ...item,
                        qty: item.purchaseQty
                    })

                    newList.push(newItem);
                }
            })

            return {
                ...state,
                stockList: newList
            }

        }

        default:
            return state;
    }
}