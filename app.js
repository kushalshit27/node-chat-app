var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){

    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.emit('news', { hello: 'world user' });
    socket.on('my other event', function (data) {
      console.log(data);
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
  });

app.get('/', function(req, res){
    res.sendFile(__dirname + '/view/chat_view.html');
});

port = process.env.PORT || 8080
http.listen(port, function(){
  console.log("listening on",port);
});