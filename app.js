const express = require("express")
const bodyParser = require("body-parser")
const multer = require('multer')

const upload = multer({
    dest:__dirname+"/uploads/bukti_transfer"
})

let urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const app = express()
let field = require("./model/field")
let user = require("./model/user")
let transaksi = require("./model/transaksi")
let bankacc = require("./model/bank")

app.use(express.static(__dirname + "/img"))

app.listen(5000, function () {
    console.log("Server is running")
})

// REGISTER
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


// LOGIN
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

// GET ALL USER DEMO NTAR PASS TAK HILANGIN
app.get("/user", function (req, res) {
    user.find(function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

// GET ALL USER BY ID
app.get("/user/:id", function (req, res) {
    user.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

// EDIT USER PROFILE
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

// GET GAMBAR LAPANGAN
app.get("/img/:gambar", function (req, res) {
    res.sendFile(__dirname + "/img/" + req.params.gambar)
})

// GET ALL TRANSAKSI & POST NEW TRANSAKSI
app.route('/transaksi')
    .get(function (req, res) {
        transaksi.find({}).sort({tanggal_transaksi: 'desc'}).exec((err,doc)=>{
            if (err) {
                console.log("Something is wrong!")
            } else {
                res.send(doc)
            }     
        })
    })
    .post(urlencodedParser, function (req, res) {
        console.log(req.body)
        transaksi.create({
            tanggal:req.body.tanggal,
            tanggal_transaksi:new Date(),
            mulai:req.body.mulai,
            selesai:req.body.selesai,
            biaya:req.body.biaya,
            biaya_sewa:req.body.biaya_sewa,
            lapangan:req.body.lapangan,
            user:req.body.user,
            field_user:req.body.field_user,
            status:req.body.status,
            nama_bank:req.body.nama_bank,
            rekening:req.body.rekening,
            an_bank:req.body.an_bank
        }, function (err, data) {
            if (err) {
                console.log("Something went wrong")
            } else {
                res.send(data)
            }
        })
    })

// GET TRANSAKSI BY ID
app.get("/transaksi/:id", function (req, res) {
    transaksi.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

// MENGUBAH TRANSAKSI SDH LUNAS ATO BELUM
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

// app.get("/transaksi/:tanggal",(req,res)=>{
//     transaksi.find({
//         tanggal:req.params.tanggal
//     },(err,doc)=>{
//         if (err) {
//             console.log("Something is wrong!")
//         } else {
//             res.send(data)
//         }
//     })
// })

// GET ALL TRANSACTION BY USERNAME
app.get("/alltransaksi/:username", function (req, res) {
    transaksi.find({
        user:req.params.username
    }).sort({tanggal_transaksi: 'desc'}).exec((err,doc)=>{
        if (err) {
            console.log("Something is wrong!")
        } else {
            res.send(doc)
        }     
    })
       
})

// GET ALL FIELD INFO & MAKE NEW FIELD
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

app.patch("/field/:id",urlencodedParser,function(req,res){
    field.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,doc){
        if (err) {
            res.send({
                message:"Something is wrong"
            })
        } else {
            res.send(doc)
        }
    })
})

app.get("/email/:email",function(req,res){
    user.findOne({
	email:req.params.email
    },function(err,data){
	if(err){
	  console.log("Error")
	}else{
	  res.send(data)
	}
    })
})

app.post("/upload", upload.single("photo"),(req,res)=>{
    if(req.file){
        res.json(req.file);
    }
    else throw "error"
})

// GET GAMBAR BUKTI
app.get("/bukti/:gambar", function (req, res) {
    res.sendFile(__dirname + "/uploads/bukti_transfer/" + req.params.gambar)
})

app.get("/upload", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get("/getbank",function(req,res){
    res.send([{
                nama_bank:"Mandiri",
                no_rek:"9000005352555",
                an_rek:"Muhammad Nuraga",
                icon:"http://trafficnet.id:5000/icon/logomandiri.png"
            },{
                nama_bank:"BCA",
                no_rek:"9000005352555",
                an_rek:"Muhammad Nuraga",
                icon:"http://trafficnet.id:5000/icon/logobca.png"
            }
        ]
    )
})

app.get("/icon/:id",function(req,res){
    res.sendFile(__dirname + "/icon/"+req.params.id)
})
