const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/arenao",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    tanggal:String,
    mulai:String,
    selesai:String,
    biaya:String,
    lapangan:String,
    user:String,
    field_user:String,
    status:String,
    nama_bank:String,
    rekening:String,
    an_bank:String,
    sort:{
        date_added: -1
    }
})

let transaksi = mongoose.model("transaksi",fieldSchema)

module.exports = transaksi