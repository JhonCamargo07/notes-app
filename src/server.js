const express = require('express');
const colors = require('colors');
const { join } = require('path');
const Handlebars = require('handlebars');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Settings
app.set('nameProject', 'Notes app');
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine(
	'.hbs',
	engine({
		defaultLayout: 'main',
		// handlebars: allowInsecurePrototypeAccess(Handlebars),
		layoutsDir: join(app.get('views'), 'layouts'),
		partialsDir: join(app.get('views'), 'partials'),
		extname: '.hbs',
	})
);

app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(flash());

//  Global variables
app.use((req, res, next) => {
	res.locals.success_mgs = req.flash('success_mgs');
	next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));

// Static files
app.use(express.static(join(__dirname, 'public')));

app.listen(app.get('port'), function () {
	console.log(`App '${app.get('nameProject')}' running in port ${app.get('port')}`.green);
	console.log(`Go to server: ${'http://127.0.0.1:'}${this.address().port.toString()}`.blue);
});

module.exports = app;
