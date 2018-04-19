var getHtml = require('./getHtml');
function getSportsInfo(majorN;umber) {
    var fullUrl;
    var frontUrl = 'http://sports.news.naver.com/',backUrl = '/index.nhn';
    if(majorNumber == 1){
         fullUrl = frontUrl+'kbaseball'+backUrl;
         getHtml(fullUrl);
    }else if(majorNumber == 2){
         fullUrl = frontUrl + 'wbaseball'+backUrl;
         getHtml(fullUrl);
    }else if(majorNumber == 3){
        fullUrl = frontUrl + 'kfootball'+backUrl;
        getHtml(fullUrl);
    }else if(majorNumber == 4){
        fullUrl = frontUrl + 'wfootball'+backUrl;
        getHtml(fullUrl);
    }else if(majorNumber == 5){
        fullUrl = frontUrl + 'basketball'+backUrl;
        getHtml(fullUrl);
    }else if(majorNumber == 6){
        fullUrl = frontUrl + 'volleyball'+backUrl;

    }else if(majorNumber == 7){
        fullUrl = frontUrl + 'esports'+backUrl;

    }
}


module.exports = getSportsInfo;