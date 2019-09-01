const router = require('express').Router()
const multer = require('multer')
const { fieldRoutes, fieldCustoms } = require('./field.router')
const { userRoutes, userCustoms } = require('./user.router')
const { transaksiRoutes, transaksiCustoms } = require('./transaksi.router')
const { avatarRoutes, avatarCustoms } = require('./avatar.router')

const storageTransfer = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/bukti_transfer')
	},
	filename: function(req, file, cb) {
		const splitName = file.originalname.split('.')
		const extension = '.' + splitName[splitName.length - 1]
		cb(null, 'transfer' + '-' + Date.now() + extension)
	}
})

const storageAvatar = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'avatars')
	},
	filename: function(req, file, cb) {
		const extension = '.' + file.mimetype.split('/')[1]
		cb(null, file.fieldname + '-' + Date.now() + extension)
	}
})

const upload = multer({
	// dest: __dirname + '../uploads/bukti_transfer'
	storage: storageTransfer,
	dest: 'uploads/bukti_transfer'
})

const uploadAvatar = multer({
	// dest: __dirname + '../avatars'
	storage: storageAvatar,
	dest: 'avatars'
})

// user REST API
router.use('/user', userRoutes)

// @api POST /register
// Register new user
router.post('/register', userCustoms.register)

// @api POST /login
// Login registered user
router.post('/login', userCustoms.login)

// @api GET /email/:email
// Get particular user data by email
router.get('/email/:email', userCustoms.getEmail)

// field REST API
router.use('/field', fieldRoutes)

// @api GET /img/:gambar
// Get field image by its filename
router.get('/img/:gambar', fieldCustoms.getFieldImg)

// transaksi REST API
router.use('/transaksi', transaksiRoutes)

// @api GET /allTransaksi/:username
// Get all transaksi data by specific username
router.get(
	'/allTransaksi/:username',
	transaksiCustoms.allTransactionsByUsername
)

// @api GET /bukti/:gambar
// Get transfer note by filename
router.get('/bukti/:gambar', transaksiCustoms.getTransferNote)

// @api GET /getbank
// Get all bank info
router.get('/getbank', transaksiCustoms.getBank)

// @api GET /icon/:id
// Get bank icon by filename
router.get('/icon/:id', transaksiCustoms.getBankIcon)

// @api POST /upload
// Upload transfer note
router.post('/upload', upload.single('photo'), transaksiCustoms.uploadBukti)

// @api GET /upload
// Display upload transfer note form
router.get('/upload', transaksiCustoms.uploadBuktiPage)

// avatar REST API
router.use('/avatar', avatarRoutes)

// @api GET /avatars
// Get all user avatars
router.get('/avatars', avatarCustoms.getAllAvatars)

// @api GET /getAvatarPage
// Display upload avatar form
router.get(
	'/getAvatarPage',
	upload.single('photo'),
	avatarCustoms.getAvatarPage
)

// @api POST /uploadAvatar
// Upload avatar data
router.post(
	'/uploadAvatar',
	uploadAvatar.single('photo'),
	avatarCustoms.uploadAvatar
)

module.exports = router
