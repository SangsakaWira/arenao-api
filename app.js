const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const routes = require('./routes')

let urlencodedParser = bodyParser.urlencoded({
    extended: false
})

// Connect mongodb
mongoose.connect('mongodb://localhost/arenao', {
    useNewUrlParser: true
})
mongoose.connection.on('open', () => console.log('DB connected'))

const app = express()

// Middleware
app.use(urlencodedParser)
app.use(bodyParser.json())
app.use(express.static(__dirname + '/img'))
app.use(express.static(__dirname + '/uploads/bukti_transfer'))
app.use(express.static(__dirname + '/avatars'))

// All API Routes
app.use('/', routes)

app.listen(5000, function() {
    console.log('Server is running')
})

// app.post('/upload', upload.single('photo'), (req, res) => {
//     if (req.file) {
//         res.json(req.file.path)
//     } else throw 'error'
// })

// app.get('/upload', function(req, res) {
//     res.sendFile(__dirname + '/index.html')
// })

// app.use((req,res)=>{
//     res.send({
//         status:404,
//         message:"Page not found"
//     })
// })

// app.post("/uploadavatar", urlencodedParser, upload.single("photo"), function (req, res) {
//     avatar.create({
//         fullname:req.body.username,
//         avatar:req.file
//     },(err,doc)=>{
//         if(err){
//             res.status(404).send(err)
//         }else{
//              res.status(200).send(doc)
//         }
//     })
// })

// app.patch("/field/:id", urlencodedParser, function (req, res) {
//     field.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     }, function (err, doc) {
//         if (err) {
//             res.send({
//                 message: "Something is wrong"
//             })
//         } else {
//             res.send(doc)
//         }
//     })
// })

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

// app.get("/avatar/:gambar", function (req, res) {
//     res.sendFile(__dirname + "/uploads/bukti_transfer/" + req.params.gambar)
// })
