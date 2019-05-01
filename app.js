const express = require("express")
const app = express()

let field = require("./model/field")

app.listen(3000,function(){
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