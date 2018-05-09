var http = require('http'), express = require('express'),
    session = require('express-session'), static = require('serve-static'),
    body = require('body-parser'),sportsInfo = require('./getSportsInfo');

var app =  express();
app.use(body.urlencoded({extended:false}));
app.use(body.json());
app.use('/',(req,res)=> {
   res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
   res.write('<h1>getSports Server</h1>');
});


http.createServer(app).listen(6006,()=> {
    console.log('포트 6006에 연결됬습니다');
});
var io = require('socket.io').listen(8888);


io.sockets.on('connection',(socket)=> {
    console.log('connect');
    socket.on('major',(message)=> {
       sportsInfo(message,socket);
    });
});





