
const eRates = {
	rur: null,
	usd: null
}

//global JSONP function for exchange rates
const success = (data) => {
	console.log(data);
//	eRates.rur = data[2]['buy'];
	eRates.rur = data[data.findIndex(el => el.ccy === 'RUR')]['buy'];
	eRates.usd = data[data.findIndex(el => el.ccy === 'USD')]['buy'];
};

//script injection for crossdomain access
const addScript = (src) => {
  const script = document.createElement('script');
	
	script.src = src;
	script.type = 'text/javascript';
	document.head.appendChild(script);
};
	
addScript('https://api.privatbank.ua/p24api/pubinfo?jsonp=success&exchange&coursid=5');


//main app function
const app = (function () {

	class Item {
		constructor(name, maket, price, date, id, orderNumber) {
			this.id = id;
			this.name = name;
			this.maket = maket;
			this.price = price;
			this.date = date;
			this.dateOfPayment = 'Нет';
			this.orderNumber = orderNumber;
		}
	}

	const items = [];
	
	let isNewItem = true;
	let currentCurrency = 'uah';
	let currentItemID;

	const nodes = {
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
				form: document.getElementById('modal1'),
		    formTitle: document.querySelector('.modal-content h4'),
		    checkCurrency: document.querySelector('.currency'),
		    currrentCurrencyNode: document.querySelectorAll('.current_currency'),
		    privatContainer: document.querySelector('.privat_container')
	};
	
	console.log(nodes.checkCurrency);
	
	const label = Array.from(nodes.form.querySelectorAll('label'));
	const input = Array.from(nodes.form.querySelectorAll('input'));

	const date = new Date().toLocaleString('ru', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric'
	});

	nodes.mainTitle.textContent = `Учет заказов на ${date}`;

	const modal = M.Modal.init(nodes.addItemModal);
	
	//clear modal form
	const clearForm = () => {
	  label.forEach(el => el.classList.remove('active'));
		input.forEach(el => el.value = '');	
	};

	const createItem = (callback) => {  //callback = renderItems
		const id = `item_${items.length}`,
		    	name = nodes.itemName.value,
		    	maket = nodes.itemMaket.value,
		    	price = nodes.itemPrice.value,
		    	order = items.length + 1;

		if (name && maket && price) {
		  items.push(new Item(name, maket, price, date, id, order));
			
			clearForm();
			modal.close();
			
			callback();
		  console.log(items);
			
		}
	};
	
	const changeItem = (callback) => {
		currentItemID.name = nodes.itemName.value;
		currentItemID.maket = nodes.itemMaket.value;
		currentItemID.price = nodes.itemPrice.value;

		callback();
		modal.close();
	};

	const renderItems = () => {
		nodes.itemContainer.innerHTML = '';

		items.forEach(el => {
			const isChecked = el.dateOfPayment !== 'Нет' ? 'checked' : '';
			const item = `
       <tr id="${el.id}" class="item">
         <td>${el.orderNumber}</td>
         <td>${el.name}</td>
         <td>${el.maket}</td>
         <td>${el.price}</td>
         <td>${el.date}</td>
         <td class="switch"> <label> Off <input type="checkbox" ${isChecked} class="payment"><span class="lever"></span>On</label></td>
         <td class="date_of_payment">${el.dateOfPayment}</td>
         <td><i class="material-icons green-text edit_item">edit</i><i class="material-icons red-text delete_item">delete_forever</i></td>
       </tr>`;

			nodes.itemContainer.insertAdjacentHTML('beforeend', item);
		})
		
		total();
	};

	const itemHandler = (ev) => {
		const currentID = ev.target.parentElement.parentElement.id;
		const currentIDForPayment = ev.target.parentElement.parentElement.parentElement.id;
//delete item click
		if (ev.target.classList.contains('delete_item')) {
			const currentItem = items.findIndex(el => el.id === currentID);
	  	const parent = document.getElementById(currentID).parentElement;
			
			items.splice(currentItem, 1);
			parent.removeChild(document.getElementById(currentID));
			
	  	if (items.length === 0) {
		  	nodes.itemContainer.innerHTML = '<tr><td colspan="8">Нет заказов. Нажмите на <b>плюс</b>, чтобы добавить новый</td></tr>';
	  	}
			
			total();
			console.log('items', items);
		}
//edit item	click	
		if (ev.target.classList.contains('edit_item')) {
			console.log(currentID);
			nodes.addItem.textContent = 'Изменить';
			nodes.formTitle.textContent = 'Внести изменения';
			modal.open();
			isNewItem = false;
			console.log(isNewItem);
			editItem(currentID);	
		}
		
//add payment date
		if (ev.target.classList.contains('payment')) {
			const currentItem = items.find(el => el.id === currentIDForPayment);

			if (ev.target.checked === true) {
				currentItem.dateOfPayment = date;
				document.getElementById(currentIDForPayment)
					.querySelector('.date_of_payment')
					.textContent = date;
				ev.target.checked = 'checked';

			} else {
				currentItem.dateOfPayment = 'Нет';
				document.getElementById(currentIDForPayment)
					.querySelector('.date_of_payment')
					.textContent = 'Нет';
				console.log(currentItem);
			}
			
			total();
		}
	};
	
//calculate total sum and stuff of all items
	const total = () => {
		const totalS = items.reduce((acc, el) => {
			return acc += parseInt(el.price);
		}, 0);
		
		const paidedItems = items.filter(el => el.dateOfPayment !== 'Нет');
		const paidedSum = paidedItems.reduce((acc, el) => {
			return acc += parseInt(el.price);
		}, 0);
		
		nodes.totalSum.textContent = totalS;
		nodes.totalItems.textContent = items.length;
		nodes.totalPaided.textContent = paidedSum;
		nodes.totalDebt.textContent = totalS - paidedSum;
		
		if (currentCurrency === 'rur') {
			nodes.exSum.textContent = `${Math.round(totalS * eRates.rur * 20) / 20} грн.`;
			nodes.exPaided.textContent =  `${Math.round(paidedSum * eRates.rur * 20) / 20} грн.`;
			nodes.exDebt.textContent = `${Math.round((totalS - paidedSum) * eRates.rur * 20) / 20} грн.`;
		} else if (currentCurrency === 'usd') {
			nodes.exSum.textContent = `${Math.round(totalS * eRates.usd * 20) / 20} грн.`;
			nodes.exPaided.textContent =  `${Math.round(paidedSum * eRates.usd * 20) / 20} грн.`;
			nodes.exDebt.textContent = `${Math.round((totalS - paidedSum) * eRates.usd * 20) / 20} грн.`;
		}
	};
	
//edit item function	
	const editItem = (id) => {
		console.log(id);
		const currentItem = items.find(el => el.id === id);
		
		console.log('currentItem', currentItem);
		
		label.forEach(el => el.classList.add('active'));

		nodes.itemName.value = currentItem.name;
		nodes.itemMaket.value = currentItem.maket;
		nodes.itemPrice.value = currentItem.price;
		
		currentItemID = currentItem;

	};
	
	
//change currency function
  const changeCurrency = (ev) => {
		const displayTable = {
			row() {nodes.privatContainer.style = 'display: table-row'},
			none() {nodes.privatContainer.style = 'display: none'}
		};
		
		currentCurrency = ev.target.value;
		
		Array.from(nodes.currrentCurrencyNode).forEach(el => {
			switch (currentCurrency) {
				case 'uah':
					el.textContent = 'грн.';
					displayTable.none();
					break;
				case 'rur':
					el.textContent = 'руб.';
					displayTable.row();
					break;
			  case 'usd':
					el.textContent = 'дол.';
					displayTable.row();
					break;
			}
		})
	};

//click on plus button to open modal
	nodes.addBtn.addEventListener('click', function () {
		nodes.formTitle.textContent = 'Добавить заказ';
		nodes.addItem.textContent = 'Добавить';

		modal.open();
		isNewItem = true;
		clearForm();
		console.log(isNewItem);
	});

//click on 'Добавить / Изменить'  button to add or change item
	nodes.addItem.addEventListener('click', function (ev) {
		if (isNewItem === true) {
			createItem(renderItems);
		} else if (isNewItem === false) {
			changeItem(renderItems);
		}
	});
	
//click on container
	nodes.itemContainer.addEventListener('click', function (ev) {
		itemHandler(ev);
	});
	
//choise of currency
	nodes.checkCurrency.addEventListener('change', (ev) => {
		changeCurrency(ev);
		total();
	});

});

app();
