const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
	res.render('index', {
		title: 'Home',
	});
};

indexCtrl.renderAbout = (req, res) => {
	res.render('about', {
		// layout: false,
		title: 'About',
	});
};

module.exports = indexCtrl;
