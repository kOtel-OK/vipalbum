(function () {
	'use strict';

	var nodes = {
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
		label: Array.from(document.getElementById('modal1').querySelectorAll('label')),
		input: Array.from(document.getElementById('modal1').querySelectorAll('input'))
	};

	var globals = {
		newItem: true,
		currentItemID: null,
		currentCurrency: 'uah',
		date: new Date().toLocaleString('ru', {
			year: 'numeric',
			month: '2-digit',
			day: 'numeric'
		}),
		items: [],
		modal: M.Modal.init(nodes.addItemModal)
	};

	const clearForm = () => {
		nodes.label.forEach(el => el.classList.remove('active'));
		nodes.input.forEach(el => el.value = '');
	};

	class Item {
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

	const createItem = callback => {
		//callback = renderItems
		const id = `item_${globals.items.length}`,
		      name = nodes.itemName.value,
		      maket = nodes.itemMaket.value,
		      price = nodes.itemPrice.value,
		      order = globals.items.length + 1;

		if (name && maket && price) {
			globals.items.push(new Item(name, maket, price, globals.date, id, order));

			clearForm();
			globals.modal.close();

			callback();
			console.log(globals.items);
		}
	};

	//calculate total sum and stuff of all items

	const total = () => {
		const uah = 'грн.';
		const totalS = globals.items.reduce((acc, el) => {
			return acc += parseInt(el.price);
		}, 0);

		const paidedItems = globals.items.filter(el => el.dateOfPayment !== 'Нет');
		const paidedSum = paidedItems.reduce((acc, el) => {
			return acc += parseInt(el.price);
		}, 0);

		nodes.totalSum.textContent = totalS;
		nodes.totalItems.textContent = globals.items.length;
		nodes.totalPaided.textContent = paidedSum;
		nodes.totalDebt.textContent = totalS - paidedSum;

		if (globals.currentCurrency === 'rur') {
			nodes.exSum.textContent = `${Math.round(totalS * eRates.rur * 20) / 20} ${uah}`;
			nodes.exPaided.textContent = `${Math.round(paidedSum * eRates.rur * 20) / 20} ${uah}`;
			nodes.exDebt.textContent = `${Math.round((totalS - paidedSum) * eRates.rur * 20) / 20} ${uah}`;
		} else if (globals.currentCurrency === 'usd') {
			nodes.exSum.textContent = `${Math.round(totalS * eRates.usd * 20) / 20} ${uah}`;
			nodes.exPaided.textContent = `${Math.round(paidedSum * eRates.usd * 20) / 20} ${uah}`;
			nodes.exDebt.textContent = `${Math.round((totalS - paidedSum) * eRates.usd * 20) / 20} ${uah}`;
		}
	};

	const renderItems = () => {
	  nodes.itemContainer.innerHTML = '';

	  globals.items.forEach(el => {
	    const isCheckedPayment = el.dateOfPayment !== 'Нет' ? 'checked' : '';
	    const isCheckedPrinting = el.dateOfPrinting !== 'Нет' ? 'checked' : '';
	    const item = `
       <tr id="${el.id}" class="item">
         <td>${el.orderNumber}</td>
         <td>${el.name}</td>
         <td>${el.maket}</td>
         <td>${el.price}</td>
         <td>${el.date}</td>
         <td>
           <label>
             <input type="checkbox" class="filled-in printing" ${isCheckedPrinting}/>
             <span class="date_of_printing">${el.dateOfPrinting}</span>
           </label>
         </td>         
         <td>
           <label>
             <input type="checkbox" class="filled-in payment" ${isCheckedPayment}/>
             <span class="date_of_payment">${el.dateOfPayment}</span>
           </label>
         </td>
  
         <td><i class="material-icons green-text edit_item">edit</i><i class="material-icons red-text delete_item">delete_forever</i></td>
       </tr>`;

	    nodes.itemContainer.insertAdjacentHTML('beforeend', item);
	  });

	  total();
	};

	//edit item function

	const editItem = id => {
		console.log(id);
		const currentItem = globals.items.find(el => el.id === id);

		console.log('currentItem', currentItem);

		nodes.label.forEach(el => el.classList.add('active'));

		nodes.itemName.value = currentItem.name;
		nodes.itemMaket.value = currentItem.maket;
		nodes.itemPrice.value = currentItem.price;

		globals.currentItemID = currentItem;
	};

	const itemHandler = ev => {
		const currentID = ev.target.parentElement.parentElement.id;
		const currentIDForPayment = ev.target.parentElement.parentElement.parentElement.id;
		//delete item click
		if (ev.target.classList.contains('delete_item')) {
			const currentItem = globals.items.findIndex(el => el.id === currentID);
			const parent = document.getElementById(currentID).parentElement;

			globals.items.splice(currentItem, 1);
			parent.removeChild(document.getElementById(currentID));

			if (globals.items.length === 0) {
				nodes.itemContainer.innerHTML = '<tr><td colspan="8">Нет заказов. Нажмите на <b>плюс</b>, чтобы добавить новый</td></tr>';
			}

			total();
			console.log('globals.items', globals.items);
		}

		//edit item	click
		if (ev.target.classList.contains('edit_item')) {
			console.log(currentID);
			nodes.addItem.textContent = 'Изменить';
			nodes.formTitle.textContent = 'Внести изменения';
			globals.modal.open();
			globals.newItem = false;
			console.log(globals.newItem);
			editItem(currentID);
		}

		//add payment date
		if (ev.target.classList.contains('payment')) {
			const currentItem = globals.items.find(el => el.id === currentIDForPayment);

			if (ev.target.checked === true) {
				currentItem.dateOfPayment = globals.date;
				document.getElementById(currentIDForPayment).querySelector('.date_of_payment').textContent = globals.date;
				ev.target.checked = 'checked';
			} else {
				currentItem.dateOfPayment = 'Нет';
				document.getElementById(currentIDForPayment).querySelector('.date_of_payment').textContent = 'Нет';
				console.log(currentItem);
			}

			total();
		}

		//add printing date
		if (ev.target.classList.contains('printing')) {
			const currentItem = globals.items.find(el => el.id === currentIDForPayment);

			if (ev.target.checked === true) {
				currentItem.dateOfPrinting = globals.date;
				document.getElementById(currentIDForPayment).querySelector('.date_of_printing').textContent = globals.date;
				ev.target.checked = 'checked';
			} else {
				currentItem.dateOfPrinting = 'Нет';
				document.getElementById(currentIDForPayment).querySelector('.date_of_printing').textContent = 'Нет';
				console.log(currentItem);
			}
		}
	};

	const changeItem = callback => {
		globals.currentItemID.name = nodes.itemName.value;
		globals.currentItemID.maket = nodes.itemMaket.value;
		globals.currentItemID.price = nodes.itemPrice.value;

		callback();
		globals.modal.close();
	};

	//change currency function

	const changeCurrency = ev => {
		const displayTable = {
			row() {
				nodes.privatContainer.style = 'display: table-row';
			},
			none() {
				nodes.privatContainer.style = 'display: none';
			}
		};

		globals.currentCurrency = ev.target.value;

		Array.from(nodes.currrentCurrencyNode).forEach(el => {
			switch (globals.currentCurrency) {
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
		});
	};

	nodes.mainTitle.textContent = `Учет заказов на ${globals.date}`;

	//click on plus button to open modal
	nodes.addBtn.addEventListener('click', function () {
		nodes.formTitle.textContent = 'Добавить заказ';
		nodes.addItem.textContent = 'Добавить';

		globals.modal.open();
		globals.newItem = true;
		console.log(globals.newItem);
		clearForm();
	});

	//click on 'Добавить / Изменить'  button to add or change item
	nodes.addItem.addEventListener('click', function (ev) {
		if (globals.newItem === true) {
			createItem(renderItems);
		} else if (globals.newItem === false) {
			changeItem(renderItems);
		}
	});

	//click on container
	nodes.itemContainer.addEventListener('click', function (ev) {
		itemHandler(ev);
	});

	//choice of currency
	nodes.checkCurrency.addEventListener('change', ev => {
		changeCurrency(ev);
		total();
	});

}());

//# sourceMappingURL=main.js.map
