const bc = require('bcryptjs');
const router = require("express").Router();
const Users = require("../users/users-model.js");

router
	.post('/register', (req, res) => {

		const user = req.body;
		const hash = bc.hashSync(user.password, 8);

		user.password = hash;

		Users.add(user)
			.then(saved => {
				res.json({saved});
			})
			.catch(err => res.send(err));
	});

router
	.post('/login', (req, res) => {
		const {username, password} = req.body;

		Users.findBy({username})
			.then(([user]) => {
				user && bc.compareSync(password, user.password)
					? res.json({message: "Welcome!"})
					: res.status(401).json({message: "Bad password!"});
			})
			.catch(err => {
				res.status(500).json({message: "Error in credentials", err});
			})
	})
module.exports = router;
