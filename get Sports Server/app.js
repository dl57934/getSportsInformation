var http = require('http'), express = require('express'),
    session = require('express-session'), static = require('serve-static'),
    body = require('body-parser');

var app =  express();
app.use(body.urlencoded({extended:false}));
app.use(body.json());
app.use('/',function (req,res) {
   res.redirect('popup.html')
});
require.config({
    baseUrl: "scripts"
});
http.createServer(app).listen(3000,function () {
    console.log('포트 3000에 연결됬습니다');
});


