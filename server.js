var express = require('express')
var socketio = require('socket.io')
var app = express()
var http = require('http').Server(app)

app.get('/', function(req, res){
	res.sendfile("index.html")
})

http.listen(3000, function(){
	console.log("running on port 3000")
})