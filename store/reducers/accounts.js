import {ADD_INVENTORY_TO_ACCOUNTS} from "../actions/accounts";
import {Account} from "../../models"
import {parseDate, randomId} from "../../Functions";

const initialState = {
    accounts: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ADD_INVENTORY_TO_ACCOUNTS: {
            const len = state.accounts.length;
            const accountsArray = [...state.accounts]

            if (len !== 0 )  {
                const latest = state.accounts[state.accounts.length - 1]
                if (parseDate(latest.date) !== parseDate(new Date())) {
                    const newAccount = new Account({
                        id: randomId(),
                        shopId: action.shopId,
                        date: new Date(),
                        purchase: action.purchase,
                        sales: [],
                        miscExpenses: [],
                    })

                    const updatedAccountsArray = [...state.accounts, newAccount];

                    return {
                        ...state,
                        accounts: updatedAccountsArray
                    }
                } else {
                    const latestPurchaseItems = [...latest.purchase.inventoryItems]
                    const {purchase} = action;

                    purchase.inventoryItems.forEach(inventoryItem => {
                        const found = latestPurchaseItems.find(i => i.itemId === inventoryItem.itemId);
                        if (!!found) {
                            const foundIndex = latestPurchaseItems.findIndex(i => i.itemId === inventoryItem.itemId);
                            latestPurchaseItems[foundIndex].purchaseQty += found.purchaseQty;
                            latestPurchaseItems[foundIndex].purchasePrice += found.purchasePrice;
                            latestPurchaseItems[foundIndex].totalPurchaseCostPerUnit = latestPurchaseItems[foundIndex].purchasePrice / latestPurchaseItems[foundIndex].purchaseQty
                        } else {
                            latestPurchaseItems.push(inventoryItem)
                        }
                    })

                    latest.purchase.transportCost += purchase.transportCost;
                    latest.purchase.totalAmount += purchase.totalAmount;

                    accountsArray[len - 1] = latest;

                    return {
                        ...state,
                        accounts: accountsArray
                    }

                }

            } else {
                const newAccount = new Account({
                    id: randomId(),
                    shopId: action.shopId,
                    date: new Date(),
                    purchase: action.purchase,
                    sales: [],
                    miscExpenses: []
                })

                const updatedAccountsArray = [...state.accounts, newAccount];

                return {
                    ...state,
                    accounts: updatedAccountsArray
                }
            }
        }

        default:
            return state
    }
}

