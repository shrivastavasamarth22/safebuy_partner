import Item from "./item";

class InventoryItem extends Item {
    constructor(itemId, name, hindiName, image, category, unit, increment, purchaseQty, purchasePrice, sellingPrice) {
        super(itemId, name, hindiName, image, category, unit, increment);
        this.purchaseQty = purchaseQty;
        this.purchasePrice = purchasePrice;
        this.sellingPrice = sellingPrice;
    }
}

export default InventoryItem;