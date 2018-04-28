var phantom = require('phantom');
var _ph, _page, _outObj;
function getGameInfo(url,socket){
    console.log(url);
        phantom.create().then(function (ph) {
            _ph = ph;
            return _ph.createPage();
        }).then(function (page) {
            _page = page;
            return _page.open(url);
        }).then(function (status) {
            console.log(status);
            return _page.evaluate(function () {
                return document.getElementById('_tab_box_kbo');
            });
        }).then(function (content) {
                console.log(content.innerText);
                
            _page.close();
            _ph.exit();
        })
}





module.exports = getGameInfo;