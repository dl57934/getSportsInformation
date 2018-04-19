var phantom = require('phantom');
var _ph,_page,_outObj;
function getHtmlData(url){
    phantom.create().then(function (ph) {
       _ph = ph;
       return _ph.createPage();
    }).then(function (page) {
        _page = page;
        return _page.open('http://sports.news.naver.com/wfootball/record/index.nhn');
    }).then(function (status) {
        console.log(status);
        return _page.evaluate(function () {
           return document.getElementById('wfootballTeamRecordBody').textContent;
        });
    }).then(function (content) {
        console.log(content);
    });
}

module.exports = getHtmlData;