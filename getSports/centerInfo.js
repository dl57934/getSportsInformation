socket.on('centerInfo',function (data) {
var ul = document.getElementById('centerInfo');
var z = 0;
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
        a.setAttribute('href','')
        a.appendChild(text);
        p.innerText = data['gameInfo'][i][y][0];
        p2.innerText = data['gameInfo'][i][y][1];
        li.appendChild(teamImg);
        li.appendChild(p);
        li.appendChild(br);
        li.appendChild(p2);
        li.appendChild(teamImg2);
        ul.appendChild(br);
        z = z + 2;
    }
}
});