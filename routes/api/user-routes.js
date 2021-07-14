const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
	// Access our User model and run .findAll() method)
	User.findAll()
		.then(dbUserData => res.json(dbUserData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /api/users/1
router.get('/:id', (req, res) => {
	User.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(dbUserData => {
			if (!dbUserData) {
				res.status(400).json({ message: 'No user found with this id' });
			}
			res.json(dbUserData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/users
router.post('/', (req, res) => { });

// POST /api/users/1
router.post('/:id', (req, res) => { });

// DELETE /api/users/1
router.delete('/:id', (req, res) => { });

module.exports = router;