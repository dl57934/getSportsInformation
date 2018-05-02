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
                var href = []
                if (whatGame[3] == 'wfootball'){
                    var todayGameLeauge = document.querySelectorAll('#_tab_group_0 > a').length;
                    whereleauge = document.querySelectorAll('#_tab_group_0 > a');
                    var img = document.querySelectorAll('img');
                    for(var i =0; i< todayGameLeauge ;i++)
                        tableName.push('_tab_box_' +whereleauge[i].getAttribute('data-key'));
                    for (var i = 0; i < img.length;i++){
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
                    var todayGame = document.querySelectorAll('#_tab_group_0 > a').length;
                    if(todayGame != 0) {
                        teamLength = document.querySelectorAll('#_tab_box_kbo > div > ul > li').length;
                        gameInfo.push(document.getElementById('_tab_box_kbo').innerText);
                        for (var i = 1; i <= teamLength; i++) {
                            var teamImg1 = document.querySelector('#_tab_box_kbo> div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list1 > div > img').src;
                            teamImg.push(teamImg1);
                            var teamImg2 = document.querySelector('#_tab_box_kbo > div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list2 > div > img').src;
                            teamImg.push(teamImg2);
                        }
                    }else {
                        gameInfo['gameInfo'] ='오늘은 경기가 없습니다.';
                    }
                }
                else if(whatGame[3]  == 'wbaseball'){
                    var gameBoardLength = document.querySelectorAll('#_tab_box_mlb > div > ul > li > div.btn_wrap > a').length;
                    var todayGame = document.querySelectorAll('#_tab_group_0 > a').length;
                    var gameBoard = document.querySelectorAll('#_tab_box_mlb > a.btn');
                    if(todayGame != 0) {
                        teamLength = document.querySelectorAll('#_tab_box_mlb > div > ul > li').length;
                        gameInfo.push(document.getElementById('_tab_box_mlb').innerText);
                        for (var i = 1; i <= teamLength; i++) {
                            var teamImg1 = document.querySelector('#_tab_box_mlb> div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list1 > div > img').src;
                            teamImg.push(teamImg1);
                            var teamImg2 = document.querySelector('#_tab_box_mlb > div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list2 > div > img').src;
                            teamImg.push(teamImg2);
                        }
                        for (var i=1;i<=gameBoardLength; i++)
                                href.push(document.querySelector('#_tab_box_mlb > div > ul > li:nth-child('+i+') > div.btn_wrap > a').href);

                    }else {
                        gameInfo['gameInfo'] ='오늘은 경기가 없습니다.';
                    }
                }
                else if(whatGame[3] == 'basketball'){
                    var tableNum = document.querySelectorAll('#_tab_group_0 > a').length;
                    competition = document.querySelectorAll('._tab_box  > div > ul > li').length;
                    var img = document.querySelectorAll('img');
                    if (tableNum != 0) {
                        var whereLeague = document.querySelectorAll('#_tab_group_0 > a');
                        for (var i = 0; i < tableNum; i++)
                            tableName.push('_tab_box_' + whereLeague[i].getAttribute('data-key'));
                        for (var i = 0; i < tableName.length; i++)
                            gameInfo.push(document.getElementById(tableName[i]).innerText.replace(/ /gi,''));
                        for (var i = 0;i<img.length;i=i+2) {
                            var teamImg1 = img[i].src;
                            teamImg.push(teamImg1);
                            var teamImg2 = img[i + 1].src;
                            teamImg.push(teamImg2);
                        }
                    }else {
                        gameInfo.push('오늘은 경기가 없습니다.');
                    }
                }
                var game = {'gameInfo':gameInfo,'teamImg':teamImg, 'href':href};
                return game;
            });
        }).then(function (content) {
            for(var i = 0;i<content['gameInfo'].length;i++) {
                content['gameInfo'][i] = content['gameInfo'][i].replace(/\n/gi, "");
                content['gameInfo'][i] = content['gameInfo'][i].replace(/TV/gi,'');
                content['gameInfo'][i] = content['gameInfo'][i].replace(/영상/gi,',');
                content['gameInfo'][i] = content['gameInfo'][i].replace(/전력비교/gi,',');
                content['gameInfo'][i] = content['gameInfo'][i].replace(/전력/gi,',');
                content['gameInfo'][i] = content['gameInfo'][i].replace(/종료기록/gi,'\n종료');
                content['gameInfo'][i] = content['gameInfo'][i].replace(/경기취소/gi,'\n경기취소');
                content['gameInfo'][i] = content['gameInfo'][i].split(',');
            }
            _page.close();
            _ph.exit();
            console.log(content);
            socket.emit('centerInfo',content);
        })
}





module.exports = getGameInfo;