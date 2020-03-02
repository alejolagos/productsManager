const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
   nombre: {
      type: String
   },
   tipo: {
      type: String
   },
   precio: {
      type: Number
   },
   cantidad: {
      type: Number
   }
}, {
   collection: 'products'
})

module.exports = mongoose.model('Product', Product)
