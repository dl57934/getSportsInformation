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
                var gameInfo = []
                var whatGame = 'wfootball';
                var todayGameLeauge = document.querySelectorAll('#_tab_group_0 > a').length;
                var whereleauge = '';
                if (whatGame == 'wfootball'){
                    whereleauge = document.querySelectorAll('#_tab_group_0 > a');
                    for(var i =0; i< todayGameLeauge ;i++)
                        tableName.push('_tab_box_' +whereleauge[i].getAttribute('data-key'));
                    for(var i = 0; i< tableName.length;i++)
                        gameInfo.push(document.getElementById(tableName[i]).innerText.replace(/\n/g, ""));
                    whereleauge = [];
                    tableName = [];
                }else if (whatGame =='volleyball') {
                     tableName.push('_tab_box_kovo');
                     gameInfo.push(document.getElementById(tableName[i]).innerText);
                }
                else if (whatGame == 'kbaseball'){
                     tableName.push('_tab_box_kbo');
                     gameInfo.push(document.getElementById(tableName[i]).innerText);
                }
                else if(whatGame == 'wbaseball'){
                    tableName.push('_tab_box_mlb');
                    gameInfo.push(document.getElementById(tableName[i]).innerText);
                }
                else if(whatGame == 'basketball'){
                    tableName.push('_tab_box_nba');
                    tableName.push('_tab_box_kbl')
                    for(var i = 0 ; i<2; i++)
                    gameInfo.push(document.getElementById(tableName[i]).innerText);
                }
                var game = {'gameInfo':gameInfo};
                return game;
            });
        }).then(function (content) {
                console.log(content);
            _page.close();
            _ph.exit();
        })
}





module.exports = getGameInfo;