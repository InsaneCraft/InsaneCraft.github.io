var express = require('express')
var socketio = require('socket.io')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var ejs = require('ejs')
var app = express()
var http = require('http').Server(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/game')

var dataSchema = new mongoose.Schema({
	name: String,
	score: Number
})

var Data = mongoose.model('Data', dataSchema)

app.get('/', function(req, res){
	res.render("index")
})

app.get('/score', function(req, res){
	Data.find({}, function(err, datas){
		res.json(datas)
	})
})

app.post('/score', function(req, res){
	var data = new Data({
		name: req.body.name,
		score: req.body.score
	})
	data.save(function(err, data){
		res.redirect('/')
	})
})

http.listen(3000, function(){
	console.log("running on port 3000")
})