import globals from "./globals";
import nodes from "./nodes";

export const changeItem = (callback) => {
	globals.currentItemID.name = nodes.itemName.value;
	globals.currentItemID.maket = nodes.itemMaket.value;
	globals.currentItemID.price = nodes.itemPrice.value;

	callback();
	globals.modal.close();
};