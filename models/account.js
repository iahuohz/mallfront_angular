var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
	name: String,
	nick: String,
	password: String,
	status: Number,
	contacts: [
		{
			name: String,
			address: String,
			postalcode: String,
			phone: String
		}
	]
}, {
		versionKey: false
	});

var Account = mongoose.model('Account', accountSchema);
module.exports = Account;