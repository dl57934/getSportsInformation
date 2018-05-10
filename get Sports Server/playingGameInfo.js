var phantom = require('phantom');
var _ph, _page, _outObj;
function getGameInfo(url,socket){
        phantom.create().then( function (ph)
         {
            _ph = ph;
            return _ph.createPage();
        }).then(function (page)
         {
            _page = page;
            return _page.open(url);
        }).then( function(status) {
            return _page.evaluate(function() {
                var pageUrl = window.location.href;
                var tableName = [];
                var gameInfo = {};
                var whatGame = pageUrl.split('/');
                var whereleauge ;
                var teamImg = [];
                var teamLength = '';
                var competition;
                var href = [];
                var team1array = [];
                var team2array = [];
                var statusArray = [];
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
                        //gameInfo.push(document.getElementById(tableName[i]).innerText.replace(/ /gi, ""));
                        var v = document.querySelectorAll("#"+tableName[i]+"> div > ul > li").length;
                        for (var  j = 1; j <= v;j++){
                        var team1Info = document.querySelector("#"+tableName[i]+"> div > ul > li:nth-child("+j+") > div.vs_list.vs_list1 > div").innerText;  
                        var team2Info = document.querySelector("#"+tableName[i] +"> div > ul > li:nth-child("+j+") > div.vs_list.vs_list2 > div").innerText;
                        var status =  document.querySelector("#"+tableName[i]+"> div > ul > li:nth-child("+j+") > div.state").innerText;
                        team1array.push(team1Info);
                        team2array.push(team2Info);
                        statusArray.push(status);
                        }
                    }
                        gameInfo['team1Info'] = team1array;  
                        gameInfo['team2Info'] = team2array;
                        gameInfo['status'] = statusArray;
                    for(var i = 0; i< tableName.length;i++) {
                        teamLength = document.querySelectorAll('#'+tableName[i]+' > div > ul > li').length;
                        for(var y= 1;y<= teamLength;y++) {
                            if(document.querySelector('#'+tableName[i]+' > div > ul > li:nth-child(' + y + ') > div.btn_wrap > a:nth-child(1)').innerText == '기록')
                                href.push(document.querySelector('#'+tableName[i]+' > div > ul > li:nth-child(' + y + ') > div.btn_wrap > a:nth-child(1)').href);
                            else{
                                href.push(document.querySelector('#'+tableName[i]+' > div > ul > li:nth-child(' + y + ') > div.btn_wrap > a').href);
                            }
                        }
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
                            var team1Info = document.querySelector("#_tab_box_kovo > div > ul > li:nth-child("+i+") > div.vs_list.vs_list1 > div").innerText;
                            var team2Info = document.querySelector("#_tab_box_kovo > div > ul > li:nth-child("+i+") > div.vs_list.vs_list2 > div").innerText;
                            var status =  document.querySelector("#_tab_box_kovo> div > ul > li:nth-child("+i+") > div.state").innerText;
                            team1array.push(team1Info);
                            team2array.push(team2Info);
                            statusArray.push(status);
                            var teamImg1 = document.querySelector('#_tab_box_kovo> div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list1 > div > img').src;
                            teamImg.push(teamImg1);
                            var teamImg2 = document.querySelector('#_tab_box_kovo > div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list2 > div > img').src;
                            teamImg.push(teamImg2);
                        }
                        for (var i = 1;i<= teamLength;i++){
                            if(document.querySelector('#_tab_box_kovo > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a:nth-child(1)').innerText == '기록')
                                href.push(document.querySelector('#_tab_box_kovo > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a:nth-child(1)').href);
                            else{
                                href.push(document.querySelector('#_tab_box_kovo > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a').href);
                            }
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
                        for (var i = 1; i <= teamLength; i++) {
                            var teamImg1 = document.querySelector('#_tab_box_kbo> div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list1 > div > img').src;
                            teamImg.push(teamImg1);
                            var teamImg2 = document.querySelector('#_tab_box_kbo > div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list2 > div > img').src;
                            teamImg.push(teamImg2);
                            var team1Info = document.querySelector("#_tab_box_kbo > div > ul > li:nth-child("+i+") > div.vs_list.vs_list1 > div").innerText;
                            var team2Info = document.querySelector("#_tab_box_kbo > div > ul > li:nth-child("+i+") > div.vs_list.vs_list2 > div").innerText;
                            var status =  document.querySelector("#_tab_box_kbo> div > ul > li:nth-child("+i+") > div.state").innerText;
                            team1array.push(team1Info);
                            team2array.push(team2Info);
                            statusArray.push(status);
                        }
                        
                        teamLength = document.querySelectorAll('#_tab_box_kbo > div > ul > li').length;
                        gameInfo['team1Info'] = team1array;  
                        gameInfo['team2Info'] = team2array;
                        gameInfo['status'] = statusArray;
                        for (var i = 1;i<= teamLength;i++){
                            try{
                                if(document.querySelector('#_tab_box_kbo > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a:nth-child(1)').innerText == '기록')
                                    href.push(document.querySelector('#_tab_box_kbo > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a:nth-child(1)').href);
                                else
                                    href.push(document.querySelector('#_tab_box_kbo > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a').href);
                            }catch(err){
                            href.push(false);
                            }
                        }
                    }else {
                        gameInfo['gameInfo'] ='오늘은 경기가 없습니다.';
                    }
                }
                else if(whatGame[3]  == 'wbaseball'){
                    var gameBoardLength = document.querySelectorAll('#_tab_box_mlb > div > ul > li > div.btn_wrap > a').length;
                    var todayGame = document.querySelectorAll('#_tab_group_0 > a').length;
                    var gameBoard = document.querySelectorAll('#_tab_box_mlb > div > ul > li:nth-child(9) > div.btn_wrap > a ');
                    if(todayGame != 0) {
                        teamLength = document.querySelectorAll('#_tab_box_mlb > div > ul > li').length;
                        for (var i = 1; i <= teamLength; i++) {
                            var teamImg1 = document.querySelector('#_tab_box_mlb> div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list1 > div > img').src;
                            teamImg.push(teamImg1);
                            var teamImg2 = document.querySelector('#_tab_box_mlb > div > ul > li:nth-child(' + i + ') > div.vs_list.vs_list2 > div > img').src;
                            teamImg.push(teamImg2);
                            var team1Info = document.querySelector("#_tab_box_mlb > div > ul > li:nth-child("+i+") > div.vs_list.vs_list1 > div").innerText;
                            var team2Info = document.querySelector("#_tab_box_mlb > div > ul > li:nth-child("+i+") > div.vs_list.vs_list2 > div").innerText;
                            var status =  document.querySelector("#_tab_box_mlb > div > ul > li:nth-child("+i+") > div.state").innerText;
                            team1array.push(team1Info);
                            team2array.push(team2Info);
                            statusArray.push(status);
                        }
                        
                        gameInfo['team1Info'] = team1array;  
                        gameInfo['team2Info'] = team2array;
                        gameInfo['status'] = statusArray;
                        for (var i=1;i <= teamLength; i++) {
                            if(document.querySelector('#_tab_box_mlb > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a:nth-child(1)').innerText == '기록')
                                href.push(document.querySelector('#_tab_box_mlb > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a:nth-child(1)').href);
                            else{
                                href.push(document.querySelector('#_tab_box_mlb > div > ul > li:nth-child(' + i + ') > div.btn_wrap > a').href);
                            }


                        }
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
                        for (var i = 0; i < tableName.length; i++){                        
                        var v = document.querySelectorAll("#"+tableName[i]+"> div > ul > li").length;
                        for (var  j = 1; j <= v;j++){
                            var team1Info = document.querySelector("#"+tableName[i]+"> div > ul > li:nth-child("+j+") > div.vs_list.vs_list1 > div").innerText;
                            var team2Info = document.querySelector("#"+tableName[i]+" > div > ul > li:nth-child("+j+") > div.vs_list.vs_list2 > div").innerText;
                            var status =  document.querySelector("#"+tableName[i]+"> div > ul > li:nth-child("+j+") > div.state").innerText;
                            team1array.push(team1Info);
                            team2array.push(team2Info);
                            statusArray.push(status);
                                }
                            }             
                        gameInfo['team1Info'] = team1array;  
                        gameInfo['team2Info'] = team2array;
                        gameInfo['status'] = statusArray;
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
        }).then(function(content) {
                console.log(content);
            content['gameInfo']['team1Info'] = content['gameInfo']['team1Info'].map((x)=>x.replace(/\n/gi, "  ")    );
            content['gameInfo']['team2Info'] = content['gameInfo']['team2Info'].map((x)=>x.replace(/\n/gi,'  '))    ;
            content['gameInfo']['status'] = content['gameInfo']['status'].map((x)=>x.replace(/\n/gi,'  '));
                _page.close();
                _ph.exit();
                console.log(content);
                socket.emit('centerInfo',content);
        })
}





module.exports = getGameInfo;
