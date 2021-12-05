import {Order, OrderItem, Customer} from "../../models"
import {randomId} from "../../Functions";
import {items} from "../../mock-data";

const potato = items[0];
const orderItem = new OrderItem({
    ...potato,
    sellingQty: 5,
    sellingPricePerUnit: 20,
    totalSalePrice: 100
})

const customer = new Customer({
    id: randomId(),
    name: "Samarth Shrivastava",
    phone: "9406523103",
    address: "Generic address",
    location: null,
    image: null
})

const newOrder = new Order({
    id: randomId(),
    type: "homedelivery",
    date: new Date(),
    tokenNo: null,
    status: "pending",
    orderItems: [orderItem],
    discount: 0,
    totalAmount: orderItem.totalSalePrice,
    customer,
    paymentStatus: false,
    amountPaid: null,
    creditDue: null
})


const initialState = {
    orders: [newOrder]
}

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}