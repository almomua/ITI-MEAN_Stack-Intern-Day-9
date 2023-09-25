const mongo = require('mongoose');

var productSchema = mongo.Schema({
    id: Number,
    name: String,
    price: Number,
    color: String
});

module.exports = mongo.model('Product', productSchema);