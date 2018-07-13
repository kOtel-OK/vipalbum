export default {
	itemContainer: document.querySelector('.item_container'),
	inputArea: document.querySelector('#textarea1'),
	addBtn: document.querySelector('.add'),
	addItemModal: document.querySelector('.modal'),
	itemName: document.getElementById('item_name'),
	itemMaket: document.getElementById('item_maket'),
	mainTitle: document.querySelector('.title'),
	itemPrice: document.getElementById('item_price'),
	addItem: document.getElementById('add_item'),
	totalItems: document.querySelector('.total_items'),
	totalSum: document.querySelector('.total_sum'),
	totalPaided: document.querySelector('.paided'),
	totalDebt: document.querySelector('.debt'),
	exSum: document.querySelector('.ex_sum'),
	exPaided: document.querySelector('.ex_paided'),
	exDebt: document.querySelector('.ex_debt'),
	formTitle: document.querySelector('.modal-content h4'),
	checkCurrency: document.querySelector('.currency'),
	currrentCurrencyNode: document.querySelectorAll('.current_currency'),
	privatContainer: document.querySelector('.privat_container'),
	label: Array.from(document.getElementById('modal1')
		.querySelectorAll('label')),
	input: Array.from(document.getElementById('modal1')
		.querySelectorAll('input'))
};
