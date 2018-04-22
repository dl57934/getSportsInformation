var getHtml = require('./getHtml');
function getSportsInfo(whatMajor) {
    var fullUrl = 'http://sports.news.naver.com/'+whatMajor+ '/index.nhn';
    console.log(fullUrl)
    getHtml(fullUrl);
}


module.exports = getSportsInfo;