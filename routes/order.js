var express = require('express');
var router = express.Router();
var Order = require('../models/order');

// 检验所有/order入口请求，如果回话过期（未登录或登录已过期），则返回401错误
router.use(function(req, res, next){
	if(!req.session.account){
		return res.status(401).end();
	}
	next();
});

router.post('/', function(req, res, next){
	var accountId = req.session.account._id;
	var order = new Order({
		orderDate : new Date(),
		accountId : accountId,
		contact : req.body.selectedContact,
		total : parseFloat(req.body.total),
		orderItems : []
	});
	var items = req.body.cartData;
	for(var i=0;i<items.length;i++){
		order.orderItems.push({
			_id : items[i].bookId,
			title : items[i].title,
			price : parseFloat(items[i].price),
			quantity : parseInt(items[i].quantity)
		});
	}
	
	order.save(function(err, result){
		if(err){
			return res.status(500).end();
		} else{
			return res.status(200).end();
		}
	});
});

router.get('/', function(req, res, next){
	var accountId = req.session.account._id;
	Order.find({accountId:accountId}, {'orderDate':1, 'total':1, 'accountId':1, 'contact':1}, 
		function(err, results){
			return res.json(results);
		}
	);
});

router.get('/:orderId', function(req, res, next){
	var orderId = req.params.orderId;
	Order.findById(orderId, function(err, order){
		return res.json(order);
	});
});

module.exports = router;
