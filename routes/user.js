var express = require('express');
var router = express.Router();
var Account = require('../models/account');

// 检验所有/user入口请求，如果回话过期（未登录或登录已过期），则返回401错误
router.use(function(req, res, next){
	if(!req.session.account){
		return res.status(401).end();
	}
	next();
});

router.post('/changepwd', function(req, res, next){
   	var id = req.session.account._id;
   	Account.findById(id, function(err, account){
   		if(account.password != req.body.oldpassword){
   			return res.json({success:false});
   		}
   		account.password = req.body.newpassword;
   		account.save(function(err, result){
   			return res.json({success:true});
   		});
   	})
});

router.post('/contact', function(req, res, next){
	var id = req.session.account._id;
	var contact = {
		name: req.body.name,
		address: req.body.address,
		postalcode: req.body.postalcode,
		phone: req.body.phone
	};
	Account.findById(id, function(err, account){
		account.contacts.push(contact);
		account.save(function(err, result){
			return res.json({success:true});
		})
	});
});

router.put('/contact/:contactId', function(req, res, next){
	var id = req.session.account._id;
	var contactId = req.params.contactId;
	Account.findById(id, function(err, account){
		for(var i=0;i<account.contacts.length;i++){
			if(account.contacts[i]._id == contactId){
				account.contacts[i].name = req.body.name;
				account.contacts[i].address = req.body.address;
				account.contacts[i].postalcode = req.body.postalcode;
				account.contacts[i].phone = req.body.phone;
				break;
			}
		}
		account.save(function(err, result){
			return res.json({success:true});
		})
	});
});

router.delete('/contact/:contactId', function(req, res, next){
	var id = req.session.account._id;
	var contactId = req.params.contactId;
	Account.findById(id, function(err, account){
		var index = -1;
		for(var i=0;i<account.contacts.length;i++){
			if(account.contacts[i]._id == contactId){
				index = i;
				break;
			}
		}
		if(index >= 0)
		account.contacts.splice(index, 1);
		account.save(function(err, result){
			return res.json({success:true});
		})
	});
});

router.get('/contact', function(req, res, next){
	var id = req.session.account._id;
	Account.findById(id, function(err, account){
		return res.json(account.contacts);
	});
});

router.get('/contact/:contactId', function(req, res, next){
	var id = req.session.account._id;
	var contactId = req.params.contactId;
	Account.findById(id, function(err, account){
		for(var i=0;i<account.contacts.length;i++){
			if(account.contacts[i]._id == contactId){
				return res.json(account.contacts[i]);
			}
		}
		return res.json();
	});
});

module.exports = router;
