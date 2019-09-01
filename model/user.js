const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
	fullname: String,
	email: String,
	password: String,
	bankacc: String,
	avatar: String
})

let user = mongoose.model('user', fieldSchema)

module.exports = user
