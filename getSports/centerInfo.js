socket.on('centerInfo', function (data) {
    var ul = document.getElementById('centerInfo');
    var z = 0, x = 0;

    for (var i = 0; i < data['gameInfo']['team1Info'].length; i++) {
        var li = document.createElement('li');
        var teamImg = document.createElement('img');
        var teamImg2 = document.createElement('img');
        var br1 = document.createElement('br');
        var br2 = document.createElement('br');
        var a = document.createElement('a');
        var text = document.createTextNode('게임 정보');
        const span = document.createElement('span');
        ul.appendChild(li);
        teamImg.setAttribute('src', data['teamImg'][x]);
        teamImg2.setAttribute('src', data['teamImg'][x + 1]);
        x = x + 2;
        li.appendChild(teamImg);
        li.appendChild(span);
        li.setAttribute('class', 'li');
        let splitTeam2 = data['gameInfo']['team2Info'][i].trim();
        if(!isNaN(splitTeam2[0])){
            splitTeam2 = splitTeam2.substring(1) + ' ' + splitTeam2[0];
        }
        
        span.innerHTML = `${data['gameInfo']['team1Info'][i]} &nbsp;&nbsp; ${data['gameInfo']['status'][i]}&nbsp;&nbsp; ${splitTeam2}`;
        li.appendChild(teamImg2);
        if (data['href'][i] != null) {
            a.setAttribute('href', data['href'][i]);
            a.setAttribute('class', 'li')
            a.appendChild(text);
            ul.appendChild(a);
            
        }
        ul.appendChild(br1);
            ul.appendChild(br2);
        z = z + 2;
    }
    $("a").click(function () {
        var a = $("a").index(this);
        var href = $("a:eq(" + a + ") ").attr("href");
        chrome.tabs.create({ url: href });
    });
});