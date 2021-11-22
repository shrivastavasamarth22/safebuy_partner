export default class Inventory {
    constructor({id, shopId, inventoryItems, date, transportationCost, totalAmount}) {
        this.id = id;
        this.shopId = shopId;
        this.inventoryItems = inventoryItems;
        this.date = date;
        this.transportationCost = transportationCost;
        this.totalAmount = totalAmount;
    }
}
