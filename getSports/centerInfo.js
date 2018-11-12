socket.on('centerInfo', function (data) {
    var ul = document.getElementById('centerInfo');
    var z = 0, x = 0;

    for (var i = 0; i < data['gameInfo']['team1Info'].length; i++) {
        var li = document.createElement('li');
        var teamImg = document.createElement('img');
        var teamImg2 = document.createElement('img');
        var p = document.createElement('p');
        var p2 = document.createElement('p');
        var br = document.createElement('br');
        var a = document.createElement('a');
        var text = document.createTextNode('게임 정보');
        var status = document.createElement('p');
        const span = document.createElement('span');
        ul.appendChild(li);
        teamImg.setAttribute('src', data['teamImg'][x]);
        teamImg2.setAttribute('src', data['teamImg'][x + 1]);

        x = x + 2;
        li.appendChild(span);
        // p.innerText = data['gameInfo']['team1Info'][i];
        // p2.innerText = data['gameInfo']['team2Info'][i];
        // status.innerText = data['gameInfo']['status'][i];
        li.setAttribute('class', 'li');
        span.appendChild(teamImg);
        span.innerHTML = `${data['gameInfo']['team1Info'][i]}      ${data['gameInfo']['status'][i]}     ${data['gameInfo']['team2Info'][i]}`;
        span.appendChild(teamImg2);
        // span.appendChild(p);
        // span.appendChild(status);
        // span.appendChild(p2);
        if (data['href'][i] != null) {
            a.setAttribute('href', data['href'][i]);
            a.setAttribute('class', 'li')
            a.appendChild(text);
            ul.appendChild(a);
        }
        ul.appendChild(br);
        z = z + 2;
    }
    $("a").click(function () {
        var a = $("a").index(this);
        var href = $("a:eq(" + a + ") ").attr("href");
        chrome.tabs.create({ url: href });
    });
});