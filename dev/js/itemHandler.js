import globals from "./globals";
import nodes from "./nodes";
import {total} from "./total";
import {editItem} from "./editItem";

export const itemHandler = (ev) => {
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
			document.getElementById(currentIDForPayment)
				.querySelector('.date_of_payment')
				.textContent = globals.date;
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

//add printing date
	if (ev.target.classList.contains('printing')) {
		const currentItem = globals.items.find(el => el.id === currentIDForPayment);

		if (ev.target.checked === true) {
			currentItem.dateOfPrinting = globals.date;
			document.getElementById(currentIDForPayment)
				.querySelector('.date_of_printing')
				.textContent = globals.date;
			ev.target.checked = 'checked';

		} else {
			currentItem.dateOfPrinting = 'Нет';
			document.getElementById(currentIDForPayment)
				.querySelector('.date_of_printing')
				.textContent = 'Нет';
			console.log(currentItem);
		}
	}
};