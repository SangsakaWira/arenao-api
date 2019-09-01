const router = require('express').Router()
const user = require('../model/user')

// GET ALL USER DEMO NTAR PASS TAK HILANGIN
/**
 * @api GET /user
 * @apiGroup User
 * @apiSuccess [Object] all user data
 */
router.get('/', function(req, res) {
	user.find(function(err, data) {
		if (err) {
			console.log('Something went wrong')
		} else {
			res.send(data)
		}
	})
})

// GET ALL USER BY ID
/**
 * @api GET /user/:id
 * @apiGroup User
 * @apiParam {id} user id
 * @apiSuccess Object selected transaksi data
 */
router.get('/:id', function(req, res) {
	user.findById(req.params.id, function(err, data) {
		if (err) {
			console.log('Something went wrong')
		} else {
			res.send(data)
		}
	})
})

// EDIT USER PROFILE
/**
 * @api PATCH /transaksi/:id
 * @apiGroup User
 * @apiParam {id} transaksi id
 * @apiSuccess Object updated transaksi data
 */
router.patch('/:id', function(req, res) {
	user.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true, runValidators: true },
		function(err, doc) {
			if (err) {
				console.log('Something wrong when updating data!')
			} else {
				console.log(doc)
				res.send(doc)
			}
		}
	)
})

// All Custom API endpoints managed by User model
const customs = {
	// REGISTER
	/**
	 * @apiGroup User
	 * @apiSuccess {Object} registered user
	 */
	register: function(req, res) {
		let data_user = req.body
		console.log(data_user.email)
		console.log(data_user.name)
		user.findOne(
			{
				fullname: data_user.name,
				email: data_user.email
			},
			function(err, data) {
				console.log(data)
				if (err) {
					console.log('Something went wrong')
				} else {
					if (data == null) {
						user.create(data_user, function(err) {
							if (err) {
								console.log('Something is wrong!')
							} else {
								res.send({
									message: 'Success'
								})
							}
						})
					} else {
						res.send({
							message: 'Email or Username is already taken'
						})
					}
				}
			}
		)
	},

	// LOGIN
	/**
	 * @apiGroup User
	 * @apiSuccess {Object} logged in user data
	 */
	login: function(req, res) {
		user.findOne(
			{
				email: req.body.email,
				password: req.body.password
			},
			function(err, data) {
				if (err) {
					console.log('Something went wrong')
				} else {
					res.send(data)
				}
			}
		)
	},

	/**
	 * @apiGroup User
	 * @apiParam {String} user email address
	 * @apiSuccess {Object} selected user with particular email address
	 */
	getEmail: function(req, res) {
		user.findOne(
			{
				email: req.params.email
			},
			function(err, data) {
				if (err) {
					console.log('Error')
				} else {
					res.send(data)
				}
			}
		)
	}
}

module.exports = {
	userRoutes: router,
	userCustoms: customs
}
