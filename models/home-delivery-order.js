export default class HomeDeliveryOrder {
    constructor({id, type, date, status, orderItems, payableAmount, discount, customer, amountPaid, creditDue}) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.status = status;
        this.orderItems = orderItems;
        this.payableAmount = payableAmount;
        this.discount = discount;
        this.customer = customer;
        this.amountPaid = amountPaid;
        this.creditDue = creditDue;
        this.totalAmount = this.payableAmount - this.discount;
    }
}