import globals from "./globals";
import nodes from "./nodes";
import {clearForm} from "./clearForm";
import {createItem} from "./createItem";
import {renderItems} from "./renderItems";
import {itemHandler} from "./itemHandler";
import {changeItem} from "./changeItem";
import {changeCurrency} from "./changeCurrency";
import {total} from "./total";


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
nodes.checkCurrency.addEventListener('change', (ev) => {
	changeCurrency(ev);
	total();
});
