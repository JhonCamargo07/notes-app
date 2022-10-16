const usersCtrl = {};

const User = require('./../models/User');
const passport = require('passport');

// Sign up
usersCtrl.renderSignUpForm = (req, res) => {
	res.render('users/signup');
};
usersCtrl.SignUp = async (req, res) => {
	const errors = [];
	const { name, email, password, confirm_password } = req.body;
	if (password != confirm_password) {
		errors.push({ text: 'Passwords do no match' });
	}
	if (password.length < 4) {
		errors.push({ text: 'Passwords must be at least 4 characteres.' });
	}

	if (errors.length > 0) {
		res.render('users/signup', {
			name,
			email,
			password,
			confirm_password,
			errors,
		});
	} else {
		const emailUser = await User.findOne({ email: email });
		if (emailUser) {
			req.flash('name', name);
			req.flash('email', email);
			req.flash('password', password);
			req.flash('confirm_password', confirm_password);
			req.flash('error_msg', 'The email is already in use');
			res.redirect('signup');
		} else {
			const newUser = new User({ name, email, password });
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			req.flash('success_msg', 'You are registered');
			res.redirect('signin');
		}
	}
	// req.body.password = User.encrypPassword(req.body.password);
	// res.render('users/signup');

	// const newUser = new User({ name, email, password });
	// await newUser.save();
	// req.flash('success_msg', 'User registred');
	// res.send(req.body);
};

// Sign in
usersCtrl.renderSignInForm = (req, res) => {
	res.render('users/signin');
};

usersCtrl.signIn = passport.authenticate('local', {
	failureRedirect: '/signin',
	successRedirect: '/notes',
	failureFlash: true,
});

// Logout
usersCtrl.logout = (req, res, next) => {
	req.logout(function (err) {
		req.flash('error_msg', err);
		return next(err);
	});
	req.flash('success_msg', 'You are logged out now.');
	res.redirect('signin');
};

module.exports = usersCtrl;
