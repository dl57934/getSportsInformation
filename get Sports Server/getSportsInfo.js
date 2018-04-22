var getHtml = require('./getHtml');
function getSportsInfo(whatMajor,socket) {
    var fullUrl = 'http://sports.news.naver.com/'+whatMajor+ '/index.nhn';
    console.log(fullUrl)
    getHtml(fullUrl,socket);
}


module.exports = getSportsInfo;