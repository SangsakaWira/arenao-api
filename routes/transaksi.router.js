const router = require('express').Router()
const transaksi = require('../model/transaksi')

// GET ALL TRANSAKSI & POST NEW TRANSAKSI
/**
 * @api GET /transaksi
 * @apiGroup Transaksi
 * @apiSuccess [Object] all transaksi data
 */
router.get('/', function(req, res) {
	transaksi
		.find({})
		.sort({ tanggal_transaksi: 'desc' })
		.exec((err, doc) => {
			if (err) {
				console.log('Something is wrong!')
			} else {
				res.send(doc)
			}
		})
})

/**
 * @api POST /transaksi
 * @apiGroup Transaksi
 * @apiSuccess { Object } inserted transaksi
 */
router.post('/', function(req, res) {
	console.log(req.body)
	transaksi.create(
		{
			tanggal: req.body.tanggal,
			tanggal_transaksi: new Date(),
			mulai: req.body.mulai,
			selesai: req.body.selesai,
			biaya: req.body.biaya,
			biaya_sewa: req.body.biaya_sewa,
			lapangan: req.body.lapangan,
			user: req.body.user,
			field_user: req.body.field_user,
			status: req.body.status,
			nama_bank: req.body.nama_bank,
			rekening: req.body.rekening,
			an_bank: req.body.an_bank
		},
		function(err, data) {
			if (err) {
				console.log('Something went wrong')
			} else {
				res.send(data)
			}
		}
	)
})

// GET TRANSAKSI BY ID
/**
 * @api GET /transaksi/:id
 * @apiGroup Transaksi
 * @apiParam {id} transaksi id
 * @apiSuccess {Object} selected transaksi
 */
router.get('/:id', function(req, res) {
	transaksi.findById(req.params.id, function(err, data) {
		if (err) {
			console.log('Something went wrong')
		} else {
			res.send(data)
		}
	})
})

// MENGUBAH TRANSAKSI SDH LUNAS ATO BELUM
/**
 * @api GET /transaksi/:id/:status
 * @apiGroup Transaksi
 * @apiParam {id} transaksi id
 * @apiParam {String} status transaksi
 * @apiSuccess Object updated transaksi data
 */
router.post('/:id/:status', function(req, res) {
	transaksi.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				status: req.params.status
			}
		},
		{
			new: true
		},
		function(err, doc) {
			if (err) {
				console.log('Something wrong when updating data!')
			} else {
				console.log(doc)
			}
		}
	)
	res.redirect('/transaksi/' + req.params.id)
})

const customs = {
	// GET ALL TRANSACTION BY USERNAME
	/**
	 * @apiGroup Transaksi
	 * @apiParam {String} transaksi username
	 * @apiSuccess [{Object}] all transaksi with particular username
	 */
	allTransactionsByUsername: function(req, res) {
		transaksi
			.find({
				user: req.params.username
			})
			.sort({ tanggal_transaksi: 'desc' })
			.exec((err, doc) => {
				if (err) {
					console.log('Something is wrong!')
				} else {
					res.send(doc)
				}
			})
	},

	// GET GAMBAR BUKTI
	/**
	 * @apiGroup Transaksi
	 * @apiParam {String} image url
	 * @apiSuccess Image
	 */
	getTransferNote: function(req, res) {
		// res.sendFile(__dirname + '/uploads/bukti_transfer/' + req.params.gambar)
		res.sendFile('uploads/bukti_transfer/' + req.params.gambar, {
			root: '.'
		})
	},

	/**
	 * @apiGroup Transaksi
	 * @apiSuccess [{Object}] all available bank account
	 */
	getBank: function(req, res) {
		res.send([
			{
				nama_bank: 'Mandiri',
				no_rek: '9000005352555',
				an_rek: 'Muhammad Nuraga',
				icon: 'http://trafficnet.id:5000/icon/logomandiri.png'
			},
			{
				nama_bank: 'BCA',
				no_rek: '6720331274',
				an_rek: 'Muhammad Nuraga',
				icon: 'http://trafficnet.id:5000/icon/logobca.png'
			}
		])
	},

	/**
	 * @apiGroup Transaksi
	 * @apiParam {id} image filename
	 * @apiSuccess Image
	 */
	getBankIcon: function(req, res) {
		// res.sendFile(__dirname + '/icon/' + req.params.id)
		res.sendFile('icon/' + req.params.id, { root: '.' })
	},

	/**
	 * @apiGroup Transaksi
	 * @apiParam {File} image file
	 * @apiSuccess {Object} uploaded image path
	 */
	uploadBukti: (req, res) => {
		if (req.file) {
			res.json(req.file.path)
		} else throw 'error'
	},

	/**
	 * @apiGroup Transaksi
	 * @apiSuccess HTML upload transfer note form
	 */
	uploadBuktiPage: function(req, res) {
		// res.sendFile(__dirname + '/index.html')
		res.sendFile('index.html', { root: '.' })
	}
}

module.exports = { transaksiRoutes: router, transaksiCustoms: customs }
