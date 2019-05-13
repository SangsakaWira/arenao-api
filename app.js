const express = require("express")
const bodyParser = require("body-parser")

let urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const app = express()
let field = require("./model/field")
let user = require("./model/user")
let transaksi = require("./model/transaksi")
app.use(express.static(__dirname + "/img"))

app.listen(5000, function () {
    console.log("Server is running")
})

app.post("/register", urlencodedParser, function (req, res) {
    let data_user = req.body
    console.log(data_user.email)
    console.log(data_user.name)
    user.findOne({
        fullname: data_user.name,
        email: data_user.email
    }, function (err, data) {
        console.log(data)
        if (err) {
            console.log("Something went wrong")
        } else {
            if (data == null) {
                user.create(data_user, function (err) {
                    if (err) {
                        console.log("Something is wrong!")
                    } else {
                        res.send({
                            message: "Success"
                        })
                    }
                })
            } else {
                res.send({
                    message: "Email or Username is already taken"
                })
            }
        }
    })
})

app.post("/login", urlencodedParser, function (req, res) {
    user.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.get("/user", function (req, res) {
    user.find(function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.get("/user/:id", function (req, res) {
    user.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.patch("/user/:id", urlencodedParser,function (req, res) {
    user.findByIdAndUpdate(req.params.id,req.body
    ,{new: true, runValidators:true}, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!")
        } else {
            console.log(doc)
            res.send(doc)
        }
    })
})

app.get("/img/:gambar", function (req, res) {
    res.sendFile(__dirname + "/img/" + req.params.gambar)
})

app.route('/transaksi')
    .get(function (req, res) {
        transaksi.find(function (err, data) {
            if (err) {
                console.log("Something is wrong!")
            } else {
                res.send(data)
            }
        })
    })
    .post(urlencodedParser, function (req, res) {
        console.log(req.body)
        transaksi.create(req.body, function (err, data) {
            if (err) {
                console.log("Something went wrong")
            } else {
                res.send(data)
            }
        })
    })

app.get("/transaksi/:id", function (req, res) {
    transaksi.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.get("/transaksi/:id/:status", function (req, res) {
    transaksi.findByIdAndUpdate(req.params.id, {
        $set: {
            status: req.params.status
        }
    }, {
        new: true
    }, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!")
        } else {
            console.log(doc)
        }
    })
    res.redirect("/transaksi/" + req.params.id)
})


app.get("/alltransaksi/:username", function (req, res) {
    transaksi.find({
        user:req.params.username
    },function(err,data){
        if(err){
            res.send({
                message:"Error"
            })
        }else{
            res.send(data)
        }
    })
       
})

app.route("/field").get(function (req, res) {
    field.find(function (err, data) {
        if (err) {
            console.log("Something is wrong!")
        } else {
            res.send(data)
        }
    })
}).post(function (req, res) {
    field.create(function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})