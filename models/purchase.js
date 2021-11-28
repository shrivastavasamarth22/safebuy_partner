export default class Purchase {
    constructor({id, shopId, inventoryItems, transportCost, totalAmount}) {
        this.id = id;
        this.shopId = shopId;
        this.inventoryItems = inventoryItems;
        this.transportCost = transportCost;
        this.totalAmount = totalAmount;
    }
}