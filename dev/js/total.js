//calculate total sum and stuff of all items
import nodes from "./nodes";
import globals from "./globals";

export const total = () => {
	const  uah = 'грн.';
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
		nodes.exPaided.textContent =  `${Math.round(paidedSum * eRates.rur * 20) / 20} ${uah}`;
		nodes.exDebt.textContent = `${Math.round((totalS - paidedSum) * eRates.rur * 20) / 20} ${uah}`;
	} else if (globals.currentCurrency === 'usd') {
		nodes.exSum.textContent = `${Math.round(totalS * eRates.usd * 20) / 20} ${uah}`;
		nodes.exPaided.textContent =  `${Math.round(paidedSum * eRates.usd * 20) / 20} ${uah}`;
		nodes.exDebt.textContent = `${Math.round((totalS - paidedSum) * eRates.usd * 20) / 20} ${uah}`;
	}
};