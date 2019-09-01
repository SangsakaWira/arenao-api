const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
    tanggal: String,
    tanggal_transaksi: Date,
    mulai: String,
    selesai: String,
    biaya: String,
    biaya_sewa: String,
    lapangan: String,
    user: String,
    field_user: String,
    status: String,
    nama_bank: String,
    rekening: String,
    an_bank: String
})

let transaksi = mongoose.model('transaksi', fieldSchema)

module.exports = transaksi
