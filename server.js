const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStorage = require('connect-session-sequelize')(session.Store);

const sequelizeSession = {
	secret: 'Super duper secret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStorage({
		db: sequelize
	})
};

// start session
app.use(session(sequelizeSession));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(require('./controllers'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});