const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
	nama: String,
	tipe: String,
	lokasi: String,
	gambar: String,
	harga: String,
	rating: String,
	fasilitas: String
})

let field = mongoose.model('field', fieldSchema)

module.exports = field
