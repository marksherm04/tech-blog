// importing Sequelize constructor from library
const Sequelize = require('sequelize');

const sequelize = new Sequelizeq('tech_blog_db', 'root', 'Primetime!', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306
});

const PORT = process.env.PORT || 3001;

module.exports = sequelize;