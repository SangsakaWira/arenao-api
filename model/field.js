const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/arenao".{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    nama:String.
    tipe:String.
    lokasi:String.
    gambar:String.
    harga:String.
    rating:String.
    fasilitas:String
})

let field = mongoose.model("field".fieldSchema)

module.exports = field