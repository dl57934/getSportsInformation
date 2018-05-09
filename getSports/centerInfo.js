socket.on('centerInfo',function (data) {
var ul = document.getElementById('centerInfo');
var z = 0, x=0;
for (var i = 0;i< data['gameInfo']['team1Info'].length;i++) {
        var li = document.createElement('li');
        var teamImg = document.createElement('img');
        var teamImg2 = document.createElement('img');
        var p = document.createElement('p');
        var p2 = document.createElement('p');
        var br = document.createElement('br');
        var a = document.createElement('a');
        var text = document.createTextNode('게임 정보');
        var status = document.createElement('p');
        ul.appendChild(li);
        teamImg.setAttribute('src', data['teamImg'][x]);
        teamImg2.setAttribute('src', data['teamImg'][x + 1]);

        x = x + 2;

        p.innerText = data['gameInfo']['team1Info'][i];
        p2.innerText = data['gameInfo']['team2Info'][i];
        status.innerText = data['gameInfo']['status'][i];
        li.appendChild(teamImg);
        li.appendChild(p);
        li.appendChild(status);
        li.appendChild(p2);
        li.appendChild(teamImg2);
        li.appendChild(br);
    if(data['href'][x]!=null) {
        a.setAttribute('href', data['href'][x]);
        a.appendChild(text);
        ul.appendChild(a);
    }
        ul.appendChild(br);
        z = z + 2;
}
    $("a").click(function () {
        var a = $("a").index(this);
        var href = $("a:eq(" + a + ") ").attr("href");
        alert(a);
        alert(href);
        chrome.tabs.create({url:href});
    });
});