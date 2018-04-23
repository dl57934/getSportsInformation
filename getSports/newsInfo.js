var queryInfo = null;
socket.on('newsInfo',function (data) {
    var name= []
    for(var i = 0 ;i<20;i++) {
        name.push(data['news'][i+2]+'\n');
    }
    var ol = document.getElementById('ol');
    for (var i = 0; i < 20; i++){
        var li = document.createElement('li');

        ol.appendChild(li);
        var a = document.createElement('a');
        var text = document.createTextNode(name[i]);
        a.appendChild(text);
        a.setAttribute('href', data['newsUrl'][i]);
        a.setAttribute('class','newsList');
        li.appendChild(a);
    }
   $("li").click(function () {
       var a = $("li").index(this);
       var href = $("li:eq(" + a + ") > a").attr("href");
       alert(a);
        chrome.tabs.create({url:href});
   });
});






