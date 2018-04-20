var phantom = require('phantom');
var _ph,_page,_outObj;
function getHtmlData(url){
    phantom.create().then(function (ph) {
       _ph = ph;
       return _ph.createPage();
    }).then(function (page) {
        _page = page;
        return _page.open(url);
    }).then(function (status) {
        console.log(status);
        return _page.evaluate(function () {
           return document.querySelector('.home_news_list').innerHTML;
        });
    }).then(function (content) {
        console.log(content);
    });
}

module.exports = getHtmlData;