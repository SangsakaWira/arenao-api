const express = require("express")
const bodyParser = require("body-parser")
const socketIO = require("socket.io")
const http = require("http")

let urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()
let field = require("./model/field")
let user = require("./model/user")
app.use(express.static(__dirname+"/img"))

app.listen(5000,function(){
    console.log("Server is running")
})

app.get("/field",function(req,res){
    field.find(function(err,data){
        if(err){
            console.log("Something is wrong!")
        }else{
            res.send(data)
        }
    })
})

app.post("/register",urlencodedParser,function(req,res){
    let data_user = req.body
    console.log(data_user.email)
    console.log(data_user.name)
    user.findOne({fullname:data_user.name,email:data_user.email},function(err,data){
        console.log(data)
        if(err){
            console.log("Something went wrong")
        }else{
            if(data==null){
                user.create(data_user,function(err){
                    if(err){
                        console.log("Something is wrong!")
                    }else{
                        res.send({
                            message:"Success"
                        })
                    }
                })
            }
            else{
                res.send({
                    message:"Email or Username is already taken"
                })
            }
        }
    })
})

app.post("/login",urlencodedParser,function(req,res){
    user.findOne({email:req.body.email,password:req.body.password},function(err,data){
        if(err){
            console.log("Something went wrong")
        }else{
            res.send(data)
        }
    })
})

app.get("/:id",function(req,res){
    user.findById(req.params.id,function(err,data){
        if(err){
            console.log("Something went wrong")
        }else{
            res.send(data)
        }
    })
})

app.get("/img/:gambar",function(req,res){
    res.sendFile(__dirname+"/img/"+req.params.gambar)
})

app.get("/transaction/:gambar",function(req,res){
    console.log("Transactions is opened")
})
