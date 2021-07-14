const User = require('./User');
const Post = require('./Post');

module.exports = { User, Post };

// associations
User.hasMany(Post, {
	foreignKey: 'user_id'
});

Post.belongsTo(User, {
	foreignKey: 'user_id'
});