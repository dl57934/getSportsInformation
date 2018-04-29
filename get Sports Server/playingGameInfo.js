var phantom = require('phantom');
var _ph, _page, _outObj;
function getGameInfo(url,socket){
        phantom.create().then(function (ph) {
            _ph = ph;
            return _ph.createPage();
        }).then(function (page) {
            _page = page;
            return _page.open(url);
        }).then(function (status) {
            return _page.evaluate(function () {
                var gameInfo= document.getElementById('_tab_box_epl').innerText;
                var team1imgSrc = new Array();
                var team2imgSrc = new Array();
                var length = document.getElementsByTagName('li').length;
                for (var i = 1; i<= length;i++){
                    var teamImg1 = document.querySelector('#_tab_box_epl > div > ul > li:nth-child('+i+') > div.vs_list.vs_list1 > div > img').src;
                    team1imgSrc.push(teamImg1);
                    var teamImg2 = document.querySelector('#_tab_box_epl > div > ul > li:nth-child('+i+') > div.vs_list.vs_list2 > div > img').src;
                    team2imgSrc.push(teamImg2);
                }
                var teamImg = team1imgSrc.concat(team2imgSrc);
                var game = {'gameInfo':gameInfo, 'teamImg':teamImg};
                return game;
            });
        }).then(function (content) {
                console.log(content);
            _page.close();
            _ph.exit();
        })
}





module.exports = getGameInfo;