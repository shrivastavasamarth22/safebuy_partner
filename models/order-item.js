import Item from "./item";

export default class OrderItem extends Item {
    constructor({itemId, name, hindiName, image, category, unit, increment, sellingQty, sellingPricePerUnit, totalSalePrice}) {
        super(itemId, name, hindiName, image, category, unit, increment);
        this.sellingQty = sellingQty;
        this.sellingPricePerUnit = sellingPricePerUnit;
        this.totalSalePrice = totalSalePrice
    }
}