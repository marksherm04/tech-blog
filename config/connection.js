// importing Sequelize constructor from library
const Sequelize = require('sequelize');

// data in .env will be made available without a variable
require('dotenv').config();

let sequelize;

// create connection to database, pass in mySQL username and password and hide the info in .env
if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
		host: 'localhost',
		dialect: 'mysql',
		port: 3306
	});
}

module.exports = sequelize;