const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/albums')
  .then(() => console.log('MongoDB was started'))
  .catch((e) => console.log(e));