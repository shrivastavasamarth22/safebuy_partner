export const ADD_INVENTORY_TO_ACCOUNTS = 'ADD_INVENTORY_TO_ACCOUNTS'

export const addInventoryToAccounts = (purchase, shopId) => {
    return {
        type: ADD_INVENTORY_TO_ACCOUNTS,
        purchase,
        shopId
    }
}