var getHtml = require('./getHtml');
function getSportsInfo(whatMajor) {
    var fullUrl = 'http://sports.news.naver.com/'+whatMajor+ '/index.nhn';
    getHtml(fullUrl);
}


module.exports = getSportsInfo;