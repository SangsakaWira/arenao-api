const router = require('express').Router()
const avatar = require('../model/avatar')
const user = require('../model/user')

/**
 * @api GET /avatar/:id
 * @apiGroup Avatar
 * @apiParam {id} Avatar id
 * @apiSuccess {Object} updated avatar
 */
router.patch('/:id', (req, res) => {
	avatar.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true
		},
		function(err, doc) {
			if (err) {
				res.send({
					message: 'Something is wrong'
				})
			} else {
				res.send(doc)
			}
		}
	)
})

/**
 * @api GET /avatar/:username
 * @apiGroup Avatar
 * @apiParam {username} Avatar username
 * @apiSuccess {Image} image of user's avatar
 */
router.get('/:username', (req, res) => {
	user.findOne({ fullname: req.params.username }, (err, doc) => {
		if (err) {
			res.send('Error or User not found')
		} else {
			res.setHeader('Content-Type', 'image/jpg')
			// res.sendFile(__dirname + "/avatars/" + doc.avatar)
			// fs.createReadStream(__dirname + '/avatars/' + doc.avatar).pipe(res)
			fs.createReadStream('avatars/' + doc.avatar, { root: '.' }).pipe(
				res
			)
		}
	})
})

const customs = {
	/**
	 * @apiGroup Avatar
	 * @apiSuccess HTML upload avatar form
	 */
	getAvatarPage: (req, res) => {
		// res.sendFile(__dirname + '/uploadavatar.html')
		res.sendFile('uploadavatar.html', { root: '.' })
	},

	/**
	 * @apiGroup Avatar
	 * @apiSuccess [{Object}] all avatars data
	 */
	getAllAvatars: (req, res) => {
		avatar.find((err, doc) => {
			if (err) {
				res.status(404).send(err)
			} else {
				res.status(200).send(doc)
			}
		})
	},

	/**
	 * @apiGroup Avatar
	 * @apiSuccess JSON contain message 'avatar updated'
	 */
	uploadAvatar: (req, res) => {
		user.findOneAndUpdate(
			req.body,
			{ avatar: req.file.filename },
			{ new: true },
			function(err, doc) {
				if (err) {
					res.send('error')
				} else {
					res.send({
						message: 'avatar updated'
					})
				}
			}
		)
		// }
		// else throw "error"
	}
}

module.exports = {
	avatarRoutes: router,
	avatarCustoms: customs
}
