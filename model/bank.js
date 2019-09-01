const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
	bankname: String,
	no_rek: String,
	an_rek: String,
	icon: String
})

let field_user = mongoose.model('field_user', fieldSchema)

module.exports = field_user
