const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/field",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    nama:String,
    tipe:String,
    lokasi:String,
    gambar:String,
    harga:String,
    rating:String,
    fasilitas:[{
        wifi:String
    },{
        kamar_mandi:String
    },{
        kafe:String
    }]
})

let data_lapangan = mongoose.model("field",fieldSchema)

module.exports = data_lapangan