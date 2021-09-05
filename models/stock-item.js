import Item from './item';

class StockItem extends Item {
    constructor({itemId, name, hindiName, image, category, unit, increment, qty}) {
        super(itemId, name, hindiName, image, category, unit, increment);
        this.qty = qty;
    }
}

export default StockItem;