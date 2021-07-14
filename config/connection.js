// importing Sequelize constructor from library
const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelizeq(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306
});

module.exports = sequelize;