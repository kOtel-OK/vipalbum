//change currency function
import globals from "./globals";
import nodes from "./nodes";

export const changeCurrency = (ev) => {
	const displayTable = {
		row() {nodes.privatContainer.style = 'display: table-row'},
		none() {nodes.privatContainer.style = 'display: none'}
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
	})
};