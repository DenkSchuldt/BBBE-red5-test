	
	var socketWS = null
	, socketWSS = null
	, centinelWS = false
	, centinelWSS = false			
	, WSRegistered = false
	, WSSRegistered = false;
							
	function getFlashMovieObject(movieName) {
		var isIE = navigator.appName.indexOf("Microsoft") != -1;
		return (isIE) ? window[movieName] : document[movieName];
	}			
	
	/*---------- Functions called from ActionScript 3----------*/
	
	// Sends a message, using ws or wss
	function sendMsgs(msg,protocol){
		if(protocol == "ws"){
			socketWS.emit('send',msg);
		}else if(protocol == "wss"){
			socketWSS.emit('send',msg);
		}				
	}
	
	// Handle Websocket connection
	function ws(wsUrl){				
		if(socketWSS){
			socketWSS.disconnect();			
		}
		if(!centinelWS){
			socketWS = io.connect(wsUrl, {secure: false, port: '7171'});					
			socketWS.emit('connect');					
		}
		if(!WSRegistered){
			socketWS.on('established', function(data){
				getFlashMovieObject("MainOptionalSOlisten").setStatus(data);
				getFlashMovieObject("MainOptionalSOlisten").enableButtons();
			});
			socketWS.on('restablished', function(data){
				getFlashMovieObject("MainOptionalSOlisten").setStatus(data);
				getFlashMovieObject("MainOptionalSOlisten").enableButtons();
			});
			socketWS.on('disconnect', function(data){
				getFlashMovieObject("MainOptionalSOlisten").setStatus(data);
				getFlashMovieObject("MainOptionalSOlisten").disableButtons();
			});
			socketWS.on('message', function(data){
				getFlashMovieObject("MainOptionalSOlisten").message(data);
			});
			WSRegistered = true;
		}		
		if(centinelWS){
			socketWS.socket.connect();
			socketWS.emit('reconnect');
		}
		centinelWS = true;				
	}
	
	// Handle Secure Websocket connection
	function wss(wssUrl){
		if(socketWS){
			socketWS.disconnect();			
		}
		if(!centinelWSS){
			socketWSS = io.connect(wssUrl,{secure: true, port: '7272'});
			socketWSS.emit('connect');
		}
		if(!WSSRegistered){
			socketWSS.on('established', function(data){
				getFlashMovieObject("MainOptionalSOlisten").setStatus(data);
				getFlashMovieObject("MainOptionalSOlisten").enableButtons();
			});
			socketWSS.on('restablished', function(data){
				getFlashMovieObject("MainOptionalSOlisten").setStatus(data);
				getFlashMovieObject("MainOptionalSOlisten").enableButtons();
			});
			socketWSS.on('disconnect', function(data){
				getFlashMovieObject("MainOptionalSOlisten").setStatus(data);
				getFlashMovieObject("MainOptionalSOlisten").disableButtons();
			});
			socketWSS.on('message', function(data){
				getFlashMovieObject("MainOptionalSOlisten").message(data);
			});
			WSSRegistered = true;
		}		
		if(centinelWSS){
			socketWSS.socket.connect();
			socketWSS.emit('reconnect');
		}
		centinelWSS = true;
	}