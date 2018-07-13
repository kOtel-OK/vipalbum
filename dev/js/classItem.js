export default class Item {
	constructor(name, maket, price, date, id, orderNumber) {
		this.id = id;
		this.name = name;
		this.maket = maket;
		this.price = price;
		this.date = date;
		this.dateOfPrinting = 'Нет';
		this.dateOfPayment = 'Нет';
		this.orderNumber = orderNumber;
	}
}