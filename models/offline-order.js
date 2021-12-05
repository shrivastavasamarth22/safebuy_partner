export default class OfflineOrder {
    constructor({id, type, date, orderItems, payableAmount, discount, customerMobile}) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.orderItems = orderItems;
        this.payableAmount = payableAmount;
        this.discount = discount;
        this.customerMobile = customerMobile;
        this.totalAmount = this.payableAmount - this.discount
    }
}