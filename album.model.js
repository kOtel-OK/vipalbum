const mongoose = require('mongoose');

//создаем для удобства константу  - поле объекта mongoose
//с помощью нее будем создвавать схему нашей модели
const Schema = mongoose.Schema;

//создаем и описываем схему модели, в конструкторе которого объект,
//содержащий поля нашей модели
//каждое поле - объект с валидаторами
const AlbumSchema = new Schema({
	item: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	maket: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		default: 0
	},
	date: {
		type: Date
	},
	isPaid: {
		type: Boolean,
		default: false
	},
	paymentDate: {
		type: Date
	}
});

//после того как создана схема, необходимо зарегистрировать ее как модель
//для этого вызываем метод model, куда передаем название коллекции для хранения данныхи вторым аргументом - нашу схему
mongoose.model('albums', AlbumSchema);