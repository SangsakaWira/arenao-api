const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/arenao-coba",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    transaksi:[String]
})

let user = mongoose.model("user",fieldSchema)

// user.create({
//     fullname:"Aditya Chandra",
//     email:"adityachandra@gmail.com",
//     password:"0dadae2d4",
//     transaksi:["1","2","3"]
// },function(err){
//     if(err){
//         console.log("Something is wrong")
//     }else{
//         console.log({
//             message:"success"
//         })
//     }
// })

user.find(function(err,data){
    if(err){
        console.log("Something is wrong")
    }else{
        console.log(data[0]["transaksi"])
    }
})

