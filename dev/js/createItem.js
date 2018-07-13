import globals from "./globals";
import nodes from "./nodes";
import {clearForm} from "./clearForm";
import Item from "./classItem";

export const createItem = (callback) => {  //callback = renderItems
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