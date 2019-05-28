const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/arenao",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    bankname:String,
    no_rek:String,
    an_rek:String,
    icon:String
})

let field_user = mongoose.model("field_user",fieldSchema)

module.exports = field_user