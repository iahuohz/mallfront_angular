var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.post('/register', function(req, res, next){
	var newAccount = new Account({
		name : req.body.name.toLowerCase(),
		nick : req.body.nick,
		password : req.body.password,
		contacts : [],
		status : 1
	});
	newAccount.save(function(err, account){
		if(err){
			return res.status(500).end();
		} else{
			return res.status(200).end();
		}
	});
});

router.get('/checkname/:name', function(req, res, next){
	var name = req.params.name.toLowerCase();
	Account.findOne({'name':name}, function(err, account){
		if(account){
			return res.json({result:'duplicate'});
		} else{
			return res.json({result:'ok'});
		}
	})
});

router.post('/login', function(req, res, next){
	var name = req.body.name;
	var password = req.body.password;
	Account.findOne({'name':name, 'password':password}, {'_id':1,'name':1, 'nick':1}, function(err, account){
		if(!account){
			return res.status(200).json({success:false});
		} else{
			req.session.account = account;
			res.cookie('isAuthenticated', 1);		// 登录成功，向cookie写入数据
			return res.status(200).json({success:true, token:account._id, nick:account.nick});
		}
	});
});

router.post('/logout', function(req, res, next){
	req.session.account = null;
	res.clearCookie('isAuthenticated');				// 退出登录，清除cookie
	return res.end();
});

module.exports = router;
