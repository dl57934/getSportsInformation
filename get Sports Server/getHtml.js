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
            var newsList = document.querySelector('#content > div > div.home_grid > div.content > div.home_article > div.home_news').innerText;
            var news = newsList.split('\n');
            var newsUrl1 = new Array();
            var newsUrl2 = new Array();
                newsUrl1[0] = document.querySelector("#content > div > div.home_grid > div.content > div.home_article > div.home_news > ul:nth-child(2) > li:nth-child(1) > a").href;
            for (var i =1 ;i<=10;i++)
                newsUrl2[i] = document.querySelector("#content > div > div.home_grid > div.content > div.home_article > div.home_news > ul.home_news_list.division > li:nth-child("+i+") > a").href;
            return newsUrl1;
        });
    }).then(function (content) {
        console.log(content);
    });
}

module.exports = getHtmlData;