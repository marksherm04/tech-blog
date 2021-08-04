const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
	Post.findAll({
		// query configuration
		order: [['created_at', 'DESC']],
		attributes: [
			'id',
			'post_content',
			'title',
			'created_at'
		],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
				include: {
					model: User,
					attributes: ['username']
				}
			},
			{
				model: User,
				attributes: ['username']
			}
		]
	})
		.then(dbPostData => res.json(dbPostData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// get one user from id
router.get('/:id', (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id
		},
		attributes: [
			'id',
			'post_content',
			'title',
			'created_at'
		],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
				include: {
					model: User,
					attributes: ['username']
				}
			},
			{
				model: User,
				attributes: ['username']
			}
		]
	})
		.then(dbPostData => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// create one post
router.post('/', withAuth, (req, res) => {
	if (req.session) {
	Post.create({
		title: req.body.title,
		user_id: req.body.user_id,
		user_id: req.session.user_id,
		post_content: req.body.post_content
	})
		.then(dbPostData => res.json(dbPostData))
		.catch(err => {
			console.log(err);
			res.status(400).json(err);
		});
	}
});

router.put('/:id', withAuth, (req, res) => {
	Post.update(
		{
			title: req.body.title
		},
		{
			where: {
				id: req.params.id
			}
		}
	)
		.then(dbPostData => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			res.json(dbPostData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete('/:id', withAuth, (req, res) => {
	Post.destroy({
		where:
		{
			id: req.params.id
		}
	})
		.then(dbPostData => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}
			res.json(dbPostData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;