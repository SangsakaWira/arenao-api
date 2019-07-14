const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/arenao", {
    useNewUrlParser: true
})

const fieldSchema = mongoose.Schema({
    fullname: String,
    avatar:JSON
})

let avatar = mongoose.model("avatar", fieldSchema)

module.exports = avatar