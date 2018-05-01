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
            return _page.evaluate(function() {
                var pageUrl = window.location.href;
                var tableName = [];
                var gameInfo = [];
                var whatGame = pageUrl.split('/');
                var whereleauge ;
                var teamImg = [];
                var teamLength = '';
                var competition;
                if (whatGame[3] == 'wfootball'){
                    var todayGameLeauge = document.querySelectorAll('#_tab_group_0 > a').length;
                     competition = document.querySelectorAll('._tab_box  > div > ul > li').length;
                    whereleauge = document.querySelectorAll('#_tab_group_0 > a');
                    var img = document.querySelectorAll('img');
                    for(var i =0; i< todayGameLeauge ;i++)
                        tableName.push('_tab_box_' +whereleauge[i].getAttribute('data-key'));
                    for (var i = 0; i < competition;i++){
                        var teamImg1 = img[i].src;
                        teamImg.push(teamImg1);
                        var teamImg2 = img[i+1].src;
                        teamImg.push(teamImg2);
                        i=i+1;
                    }
                    for(var i = 0; i< tableName.length;i++) {
                        gameInfo.push(document.getElementById(tableName[i]).innerText.replace(/ /gi, ""));
                    }
                    whereleauge = [];
                    tableName = [];
                }
                else if (whatGame[3]  =='volleyball') {
                    var todayGame = document.querySelectorAll('#_tab_group_0 > a').length;
                    if(todayGame != 0) {
                        teamLength = document.querySelectorAll('#_tab_box_kovo > div > ul > li').length;
                        gameInfo.push(document.getElementById('_tab_box_kovo').innerText);
                        for (var i = 1; i <= teamLength; i++) {
                            var teamImg1 = document.querySelector('#_tab_box_kovo> div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list1 > div > img').src;
                            teamImg.push(teamImg1);
                            var teamImg2 = document.querySelector('#_tab_box_kovo > div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list2 > div > img').src;
                            teamImg.push(teamImg2);
                        }
                    }
                    else {
                        gameInfo['gameInfo'] ='오늘은 경기가 없습니다.';
                    }
                }
                else if (whatGame[3]  == 'kbaseball'){
                     tableName.push('_tab_box_kbo');
                     gameInfo.push(document.getElementById(tableName[i]).innerText);
                }
                else if(whatGame[3]  == 'wbaseball'){
                    tableName.push('_tab_box_mlb');
                    gameInfo.push(document.getElementById(tableName[i]).innerText);
                }
                else if(whatGame[3] == 'basketball'){
                    tableName.push('_tab_box_nba');
                    tableName.push('_tab_box_kbl')
                    for(var i = 0 ; i<2; i++)
                    gameInfo.push(document.getElementById(tableName[i]).innerText);
                }
                var game = {'gameInfo':gameInfo,'teamImg':teamImg};
                gameInfo = [];
                return game;
            });
        }).then(function (content) {
            for(var i = 0;i<content['gameInfo'].length;i++)
                content['gameInfo'][i] = content['gameInfo'][i].replace(/\n/gi,"");
            _page.close();
            _ph.exit();
            console.log(content);
            socket.emit('centerInfo',content);
        })
}





module.exports = getGameInfo;