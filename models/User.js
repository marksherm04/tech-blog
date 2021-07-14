const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class User extends Model { }

// table columns
User.init(
	{
		// TABLE COLUMN DEFINTIONS	
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		// define a username column
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		// define an email column
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			// no duplicate emails allowed
			unique: true,
			// if allowNull is set to false, we can run our data through validators before creating table data
			validate: {
				isEmail: true
			}
		},
		// define a password column
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				// password must be at least 8 characters long
				len: [8]
			}
		}
	},
	{
		// TABLE CONFIGURATION OPTIONS 
		sequelize,
		// don't automatically create createdAt/updatedAt timestamp fields
		timestamps: false,
		// don't pluralize name of database table
		freezeTableName: true,
		// use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
		underscored: true,
		// make it so our model name stays lowercase in the database
		modelName: 'user'
	}
);
module.exports = User;