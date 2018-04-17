var http = require('http'), express = require('express'),
    session = require('express-session'), static = require('serve-static'),
    body = require('body-parser');

var app =  express();
app.use(body.urlencoded({extended:false}));
app.use(body.json());
app.use('/',function (req,res) {
   res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
   res.write('<h1>getSports Server</h1>')
});


var socketServer = http.createServer(app);
var io = require('socket.io')(socketServer);

socketServer.listen(3002,function () {
    console.log('포트 3002에 연결됬습니다');
});

io.on('connection',function (socket) {
    console.log('Socket connection established');
});

var server = http.createServer(app);
server.listen(3000);









