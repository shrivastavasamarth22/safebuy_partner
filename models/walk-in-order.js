export default class WalkInOrder {
    constructor({id, type, date, tokenNo, status, orderItems, payableAmount, discount, customer, amountPaid, creditDue}) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.tokenNo = tokenNo;
        this.status = status;
        this.orderItems = orderItems;
        this.payableAmount = payableAmount;
        this.discount = discount;
        this.customer = customer;
        this.amountPaid = amountPaid;
        this.creditDue = creditDue;
        this.totalAmount = this.payableAmount - this.discount
    }
}