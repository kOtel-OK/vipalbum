import nodes from "./nodes";

export default {
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
