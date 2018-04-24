var phantom = require('phantom');
var _ph,_page,_outObj;
function getHtmlData(url,socket){
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
            var liLength = $('.home_news_list > li').length;
            for (var i = 1;i<=10;i++)
                newsUrl1.push( document.querySelector("#content > div > div.home_grid > div.content > div.home_article > div.home_news > ul:nth-child(2) > li:nth-child("+i+") > a").href);

            for (var i =1 ;i <= liLength-10;i++)
                 newsUrl2.push(document.querySelector("#content > div > div.home_grid > div.content > div.home_article > div.home_news > ul.home_news_list.division > li:nth-child(" + i + ") > a").href);
            var newsUrl = newsUrl1.concat(newsUrl2);
            var newsInfo = {'news':news,'newsUrl':newsUrl,'newsLength':liLength}
            return newsInfo;
        });
    }).then(function (content) {
        socket.emit('newsInfo',content);
    });
}

module.exports = getHtmlData;