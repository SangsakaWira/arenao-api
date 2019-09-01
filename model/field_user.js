const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
	fullname: String,
	email: String,
	password: String,
	transaksi: [String]
})

let field_user = mongoose.model('field_user', fieldSchema)

module.exports = field_user
