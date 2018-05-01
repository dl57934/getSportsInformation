var phantom = require('phantom');
var _ph, _page, _outObj;
function getGameInfo(url,socket,whatGame){
        phantom.create().then(function (ph) {
            _ph = ph;
            return _ph.createPage();
        }).then(function (page) {
            _page = page;
            return _page.open(url);
        }).then(function (status) {
            return _page.evaluate(function () {
                var tableName = [];
                if (whatGame == 'wfootball'){
                     tableName.push('_tab_box_epl');
                     tableName.push('_tab_box_primera');
                     tableName.push('_tab_box_bundesliga');
                     tableName.push('_tab_box_seria');
                     tableName.push('_tab_box_champs');
                     tableName.push('_tab_box_europa');
                }else if (whatGame =='volleyball') {
                     tableName.push('_tab_box_kovo');
                }
                else if (whatGame == 'kbaseball'){
                     tableName.push('_tab_box_kbo');
                }
                else if(whatGame == 'wbaseball'){
                    tableName.push('_tab_box_mlb');
                }
                else if(whatGame == 'basketball'){
                    tableName.push('_tab_box_nba');
                    tableName.push('_tab_box_kbl')
                }
                var gameInfo= document.getElementById('_tab_box_epl').innerText;
                var teamImg = new Array();
                var teamLength = document.querySelectorAll('#_tab_box_epl > div > ul > li').length;
                for (var i = 1; i <= teamLength;i++){
                    var teamImg1 = document.querySelector('#_tab_box_epl > div > ul > li:nth-child('+i+') > div.vs_list.vs_list1 > div > img').src;
                    teamImg.push(teamImg1);
                    var teamImg2 = document.querySelector('#_tab_box_epl > div > ul > li:nth-child('+i+') > div.vs_list.vs_list2 > div > img').src;
                    teamImg.push(teamImg2);
                }
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