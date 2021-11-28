export default class Account {
    constructor({id, shopId, date, purchase, sales, miscExpenses}) {
        this.id = id;
        this.shopId = shopId;
        this.date = date;
        this.purchase = purchase;
        this.sales = sales;
        this.miscExpenses = miscExpenses
    }
}