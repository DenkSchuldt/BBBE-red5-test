
var net = require('net');
var netserver = net.createServer(function(server){
	server.on('connect', function(data) {
		console.log("server connected");
	});
	server.on('data', function(data) {
		console.log(data.toString());
		server.write(data.toString());
	});
	server.on('close', function() {
		console.log('server disconnected');
		server.end();
	});
});

netserver.addListener("error",function(err){
	console.log("ERROR : " + err);
});

netserver.listen(7843, '127.0.0.1', function(){
	console.log("Listening on port 7843.");
});