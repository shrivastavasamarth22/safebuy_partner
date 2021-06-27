export default class Inventory {
    constructor(id, inventoryItems, date, transportationCost, totalAmount) {
        this.id = id;
        this.inventoryItems = inventoryItems;
        this.date = date;
        this.transportationCost = transportationCost;
        this.totalAmount = totalAmount;
    }
}