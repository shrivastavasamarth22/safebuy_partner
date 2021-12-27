import {Inventory} from "../../models";
import {ADD_INVENTORY, UPDATE_INVENTORY} from "../actions/inventory";
import {parseDate, randomId} from "../../Functions";

const initialState = {
    inventory: []
}

export default (state = initialState, action) => {

    switch(action.type) {
        case ADD_INVENTORY: {
            const inventoryArray = [...state.inventory];

            if (inventoryArray.length !== 0) {
                const latest = inventoryArray[inventoryArray.length - 1];

                if (parseDate(latest.date) !== parseDate(new Date())) {
                    const updatedInventory = new Inventory({
                        id: randomId(),
                        shopId: action.shopId,
                        inventoryItems: action.items,
                        date: new Date(),
                        transportationCost: action.transportCost,
                        totalAmount: action.totalAmount
                    })
                    const updatedInventoryArray = [...state.inventory, updatedInventory];

                    return {
                        ...state,
                        inventory: updatedInventoryArray
                    }
                } else {
                    const latestItems = [...latest.inventoryItems]
                    const {items} = action;

                    items.forEach(item => {
                        const found = latestItems.find(i => i.itemId === item.itemId);
                        if (!!found) {
                            const foundIndex = latestItems.findIndex(i => i.itemId === item.itemId);
                            latestItems[foundIndex].purchaseQty += found.purchaseQty
                            latestItems[foundIndex].purchasePrice += found.purchasePrice
                            latestItems[foundIndex].totalPurchaseCostPerUnit = latestItems[foundIndex].purchasePrice / latestItems[foundIndex].purchaseQty
                        } else {
                            latestItems.push(item)
                        }
                    })

                    latest.inventoryItems = latestItems;


                    latest.totalAmount += action.totalAmount;
                    latest.transportationCost += action.transportCost

                    inventoryArray[inventoryArray.length - 1] = latest;

                    return {
                        ...state,
                        inventory: inventoryArray
                    }
                }
            } else {
                const updatedInventory = new Inventory({
                    id: randomId(),
                    shopId: action.shopId,
                    inventoryItems: action.items,
                    date: new Date(),
                    transportationCost: action.transportCost,
                    totalAmount: action.totalAmount
                })
                const updatedInventoryArray = [...state.inventory, updatedInventory];

                return {
                    ...state,
                    inventory: updatedInventoryArray
                }
            }

        }

        case UPDATE_INVENTORY: {
            const inventoryArray = [...state.inventory]
            const foundIndex = inventoryArray.findIndex(i => i.id === action.id);
            inventoryArray[foundIndex].inventoryItems = action.items;

            return {
                ...state,
                inventory: inventoryArray
            }

        }

        default:
            return state
    }
}