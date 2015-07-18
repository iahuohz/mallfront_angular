var express = require('express');
var router = express.Router();
var Category = require('../models/category.js');
var Book = require('../models/book.js');

router.get('/categories', function(req, res, next) {
	Category.find({}, function(err, categories){
		if(err){
			return res.status(500);
		} else{
			return res.status(200).json(categories);
		}
	});
});

router.get('/books', function(req, res, next) {
	Book.find({}, function(err, books){
		if(err){
			return res.status(500);
		} else{
			return res.status(200).json(books);
		}
	});
});

router.get('/books/:categoryId', function(req, res, next) {
	var categoryId = parseInt(req.params.categoryId);
	if(categoryId){
		filter = {category:categoryId};
	}
	Book.find(filter, function(err, books){
		if(err){
			return res.status(500);
		} else{
			return res.status(200).json(books);
		}
	});
});

router.get('/book/:bookId', function(req, res, next){
	var bookId = req.params.bookId;
	Book.findOne({_id:bookId}, function(err, book){
		if(err){
			return res.status(500);
		} else{
			Category.findOne({_id:book.category}, function(err, category){
				book.categoryName = category.name;
				return res.status(200).json(book);
			})
		}
	})
})

module.exports = router;
