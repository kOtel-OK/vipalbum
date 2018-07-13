import nodes from "./nodes";
import {total} from "./total";
import globals from "./globals";

export const renderItems = () => {
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