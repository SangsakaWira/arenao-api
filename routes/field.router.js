const router = require('express').Router()
const field = require('../model/field')

// GET ALL FIELD INFO & MAKE NEW FIELD
/**
 * @api GET /field
 * @apiGroup Field
 * @apiSuccess [Object] all field data
 */
router.get('/', function(req, res) {
	field.find(function(err, data) {
		if (err) {
			console.log('Something is wrong!')
		} else {
			res.send(data)
		}
	})
})

/**
 * @api POST /field
 * @apiGroup Field
 * @apiSuccess Object inserted field data
 */
router.post('/', function(req, res) {
	field.create(req.body, function(err, data) {
		if (err) {
			console.log('Something went wrong')
		} else {
			res.send(data)
		}
	})
})

/**
 * @api PATCH /field/:id
 * @apiGroup Field
 * @apiParam {id} transaksi id
 * @apiSuccess Object updated transaksi data
 */
router.patch('/:id', function(req, res) {
	field.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
		err,
		doc
	) {
		if (err) {
			res.send({
				message: 'Something is wrong'
			})
		} else {
			res.send(doc)
		}
	})
})

const customs = {
	// GET GAMBAR LAPANGAN
	/**
	 * @apiGroup Field
	 * @apiParam {String} image url
	 * @apiSuccess Image
	 */
	getFieldImg: function(req, res) {
		res.sendFile('img/' + req.params.gambar, { root: '.' })
	}
}

module.exports = { fieldRoutes: router, fieldCustoms: customs }
