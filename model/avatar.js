const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
	fullname: String,
	avatar: String
})

let avatar = mongoose.model('avatar', fieldSchema)

module.exports = avatar
