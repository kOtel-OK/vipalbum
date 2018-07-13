//edit item function
import globals from "./globals";
import nodes from "./nodes";

export const editItem = (id) => {
	console.log(id);
	const currentItem = globals.items.find(el => el.id === id);

	console.log('currentItem', currentItem);

	nodes.label.forEach(el => el.classList.add('active'));

	nodes.itemName.value = currentItem.name;
	nodes.itemMaket.value = currentItem.maket;
	nodes.itemPrice.value = currentItem.price;

	globals.currentItemID = currentItem;
};