var express = require('express');
var router = express.Router();
var gravatar = require('gravatar');
var bcrypt = require('bcrypt');

//Model
var User = require('../models/user');
/* GET users listing. */
router.post('/register', async (req, res, next) => {
	const { firstname, lastname, email, mobile } = req.body;

	const avatar = gravatar.url(email, {
		s: '200',
		r: 'pg',
		d: 'mm'
	});
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const password = await bcrypt.hash(req.body.password, salt);
	const user = new User({
		firstname,
		lastname,
		email,
		password,
		mobile,
		avatar
	});
	await user.save();
	res.json({ Status: 'Success' });
});

module.exports = router;
