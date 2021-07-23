const express = require('express');
const routes = require('./controllers');


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(require('./controllers'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});