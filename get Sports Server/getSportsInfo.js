var getHtml = require('./getHtml');
var getGameInfo = require('./playingGameInfo');
var date = new Date();
var dd =date.getDate();
var mm = date.getMonth()+1;
var yyyy = date.getFullYear();
if(dd <10) dd='0'+dd;
if (mm<10) mm='0'+mm;
var fulllday = yyyy+''+mm+''+dd;
function getSportsInfo(whatMajor,socket) {
    var fullUrl = 'http://sports.news.naver.com/'+whatMajor+ '/index.nhn';
    var fullGameInfo = 'http://sports.news.naver.com/'+whatMajor+'/ajax/templateMatchBox.nhn?date=20180503';
    getHtml(fullUrl,socket);
    getGameInfo(fullGameInfo,socket,whatMajor);
}


module.exports = getSportsInfo;