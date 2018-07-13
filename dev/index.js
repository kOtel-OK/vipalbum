const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/albums')
  .then(() => console.log('MongoDB was started'))
  .catch((e) => console.log(e));

//подключаем созданную модель (созданный файл)
require('./album.model');

// сздаем переменную для коллекции, по которой мы будем к ней обращаться
const Album = mongoose.model('albums');

// [
// 	{item: 1, name: 'school', maket: 'jeans', price: 1000},
// 	{item: 2, name: 'school2', maket: 'white', price: 2000},
// 	{item: 3, name: 'school3', maket: 'hitech', price: 3000}
// ].forEach(el => {
// 	new Album(el).save();
// });

// Album.find({item: 2}).then(el => {
// 	el.forEach(e => {
// 		e.remove();
// 	});
// 	console.log('Removed!');
// });

Album.find({}).then(albums => {
	console.log(albums);
});


// album.save()
// 	.then(album => console.log(album))
// 	.catch(e => console.log(e));



