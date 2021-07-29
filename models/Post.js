const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creating Post model
class Post extends Model {}

// May have to add code in above for Post extends Model {}

// creating columns for Post model
Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		post_content: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id'
			}
		}
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'post'
	}
);

module.exports = Post;