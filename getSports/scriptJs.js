var socket = io.connect('http://192.168.99.100:8888');
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
    try {
        chrome.storage.sync.set({
            whatMajor: {
                'whatMajor': majorNum[0]
                , 'majorNum': majorNum[1]
            }
        });
    }catch (err){

    }
    var ol = document.getElementById('newsInfo');
    var ul = document.getElementById('centerInfo');
    var lis = document.getElementsByTagName('li');
    var br = document.getElementsByTagName('br');
    var a = document.getElementsByTagName('a');
    var leftLength = $('#newsInfo > li').length;
    var centerLength = $('#centerInfo > li').length;
    var centerbrLength = $('#centerInfo > br').length;
    var centerA = $('#centerInfo > a').length;
    for ( var i =leftLength-1;i>=0;i--)
        ol.removeChild(lis[i]);
    for (var i = centerLength-1;i>=0;i--)
        ul.removeChild(lis[i]);
    for (var i = centerLength-1;i>=0;i--)
        ul.removeChild(a[i]);
    for (var i = centerbrLength-1;i>=0;i--)
        ul.removeChild(br[i]);
});
