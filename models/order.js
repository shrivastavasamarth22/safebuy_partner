export default class Order {
    constructor(
        id,
        type,
        date,
        tokenNo,
        status,
        orderItems,
        totalAmount,
        discount,
        customer,
        paymentStatus,
        amountPaid,
        creditDue
    ) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.tokenNo = tokenNo;
        this.status = status;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.discount = discount;
        this.customer = customer;
        this.paymentStatus = paymentStatus;
        this.amountPaid = amountPaid;
        this.creditDue = creditDue;
    }
}