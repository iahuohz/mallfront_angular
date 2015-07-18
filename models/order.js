var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	orderDate: Date,
	total: Number,
	accountId: String,
	contact: {
		_id: String,
		name : String,
		address: String,
		postalcode:String,
		phone:String
	},
	orderItems : [{
		_id: String,
		title: String,
		price: Number,
		quantity: Number
	}]
}, {
		versionKey: false
	});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;