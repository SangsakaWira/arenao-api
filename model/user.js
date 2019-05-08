const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/arenao",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    transaksi:[String]
})

let user = mongoose.model("user",fieldSchema)

module.exports = user