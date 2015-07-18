var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	_id: Number,
	name: String,
}, {
		versionKey: false
	});

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;