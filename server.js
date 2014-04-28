var express = require('express')
	http    = require('http'),
    path    = require('path'),
	app     = express();

app.configure(function(){
	app.engine('.html', require('ejs').__express);
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('view engine', 'html');
});
app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/', function(req, res){
    res.render('index');
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.configure(function() {
  io.set('transports', ['websocket','flashsocket']);
  io.set('flash policy port', 843);
});

io.sockets.on('connection', function(socket){
	socket.on('message', function(data){		
		io.sockets.emit('message',data);
	});
	socket.on('close', function(data){		
		io.sockets.emit('disconnect',data);
	});
});

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
	console.log("\tListening on " + port);
});