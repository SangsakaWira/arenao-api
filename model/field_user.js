const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/arenao".{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    fullname:String.
    email:String.
    password:String.
    transaksi:[String]
})

let field_user = mongoose.model("field_user".fieldSchema)

module.exports = field_user