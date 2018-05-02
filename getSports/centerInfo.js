socket.on('centerInfo',function (data) {
var ul = document.getElementById('centerInfo');
var z = 0, x=0;
for (var i = 0;i< data['gameInfo'].length;i++) {
    for (var y = 0; y < data['gameInfo'][i].length-1; y++) {
        var li = document.createElement('li');
        var teamImg = document.createElement('img');
        var teamImg2 = document.createElement('img');
        var p = document.createElement('p');
        var p2 = document.createElement('p');
        var br = document.createElement('br');
        var a = document.createElement('a');
        var text = document.createTextNode('게임 정보');
        ul.appendChild(li);
        data['gameInfo'][i][y] = data['gameInfo'][i][y].split('\n');
        teamImg.setAttribute('src', data['teamImg'][z]);
        teamImg2.setAttribute('src', data['teamImg'][z + 1]);
        a.setAttribute('href',data['href'][x]);
        x = x+1;
        a.appendChild(text);
        p.innerText = data['gameInfo'][i][y][0];
        if(data['gameInfo'][i][y][1] = 'undefined')
            p2.innerText = '현재 경기중이 아닙니다';
        else
            p2.innerText = data['gameInfo'][i][y][1];
        li.appendChild(teamImg);
        li.appendChild(p);
        li.appendChild(p2);
        li.appendChild(teamImg2);
        li.appendChild(br);
        ul.appendChild(a);
        ul.appendChild(br);
        z = z + 2;
    }
}
    $("ul").click(function () {
        var a = $("ul").index(this);
        var href = $("ul:eq(" + a + ") > a").attr("href");
        chrome.tabs.create({url:href});
    });
});