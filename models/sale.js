export default class Sale {
    constructor({id, shopId, orderItems, totalAmount}) {
        this.id = id;
        this.shopId = shopId;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount
    }
}