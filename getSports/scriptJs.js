var socket = io.connect('http://127.0.0.1:8000');
socket.on('connect',function () {
   console.log('Client connected');
});
chrome.storage.sync.get(function (data) {
    if(data.whatMajor== null)socket.emit('major',data.whatMajor['whatMajor']);
    document.querySelector("#whatSports").options[data.whatMajor['majorNum']-1].setAttribute('selected','selected');
    socket.emit('major', data.whatMajor['whatMajor']);
});


document.querySelector('#whatSports').addEventListener("change",function () {
    var majorNum = document.querySelector('#whatSports').value;
    majorNum = majorNum.split(',');
    socket.emit('major', majorNum[0]);
    chrome.storage.sync.set({
        whatMajor: {
            'whatMajor':majorNum[0]
        ,'majorNum':majorNum[1]}
        });
    var ol = document.getElementById('ol');
    var lis = document.getElementsByTagName('li');
    for(var i =19;i>=0 ;i--)
    ol.removeChild(lis[i]);
});
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
        li.appendChild(a);
    }
});