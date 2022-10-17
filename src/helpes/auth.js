const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error_msg', 'Not authorized');
		return res.redirect('/signin');
	}
	return next();
};

module.exports = helpers;
