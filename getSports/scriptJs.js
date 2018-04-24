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
    var liLength = $('#ol > li').length;
    alert(liLength);
    for ( var i =liLength-1;i>=0;i--)
        ol.removeChild(lis[i]);

});
