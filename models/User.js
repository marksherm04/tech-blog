const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// importing package to secure password on creation
const bcrypt = require('bcrypt');

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
		hooks: {
			// creates hash password right before new User is created
			async beforeCreate(newUserData) {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			// adds new bcrypt when password is updated
			async beforeUpdate(updatedUserData) {
				updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
				return updatedUserData;
			}
		},
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