/** @format */

import User from '../model/user';
import { genSalt, hash, compare } from 'bcrypt';
import { url } from 'gravatar';
import Profile from '../model/profile';

const regiForm = (req, res) => {
	res.render('register');
};

const loginForm = (req, res) => {
	res.render('login');
};

const create = async (req, res) => {
	try {
		if (req.body.password == req.body.confirmPass) {
			const { firstName, lastName, email, mobile } = req.body;
			const salt = await genSalt(12);
			const password = await hash(req.body.password, salt);
			const avatar = await url(req.body.email, { s: '200', r: 'pg', d: '404' });
			const isRegister = await User.findOne({ email: email });
			const userData = new User({
				firstName,
				lastName,
				email,
				password,
				avatar,
				mobile,
			});
			if (!isRegister) {
				await userData.save();
				res.redirect('/users/login');
				// res.send(`The user is registered ✊ 🤦‍♂`)
			} else {
				errors.email = 'Email Already Exists';
				res.json(errors);
			}
			res.send(userData);
		} else {
			res.json({ err: ' please check your password' });
		}
	} catch (error) {
		res.send(error);
	}
};

const login = async (req, res) => {
	try {
		if (req.body.password === req.body.confirmPass) {
			const isUser = await User.findOne({ email: req.body.email });
			if (!isUser) {
				// redirect to the registration page
				res.redirect('/register');
				res.json({ err: 'Please go to the registration' });
			} else {
				await compare(req.body.password, isUser.password);

				res.redirect(`/dashboard/${isUser._id}`);
				// To do Send the data to the view
			}
		} else {
			res.json({ err: 'Please check your password ' });
		}
	} catch (error) {
		res.json(error);
	}
};

const allUser = async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ users });
	} catch (error) {
		res.json(error);
	}
};

const dashboard = async (req, res) => {
	try {
		const uid = req.params.uid;
		const profile = await Profile.findOne({ user: uid }).populate('Users');
		const user = await User.findById(uid);
		// res.json(profile)
		res.render('dashboard', { profile: profile, user: user });
	} catch (error) {
		res.json(error);
	}
};
export default { create, login, allUser, regiForm, loginForm, dashboard };
