export default class Account {
    constructor({id, date, purchases, sales}) {
        this.id = id;
        this.date = date;
        this.purchases = purchases;
        this.sales = sales;
    }
}