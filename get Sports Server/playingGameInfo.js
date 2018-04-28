var phantom = require('phantom');
var _ph, _page, _outObj;
function getGameInfo(major,socket){
        phantom.create().then(function (ph) {
            _ph = ph;
            return _ph.createPage();
        }),
}





module.exports = getGameInfo;