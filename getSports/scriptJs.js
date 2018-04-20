var socket = io.connect('http://127.0.0.1:8000');
socket.on('connect',function () {
   console.log('Client connected');
});
chrome.storage.sync.get(function (data) {
    if(data.whatMajor== null)socket.emit('major',1);
    document.querySelector("#whatSports").options[data.whatMajor-1].setAttribute('selected','selected');
    socket.emit('major', data.whatMajor);
});


document.querySelector('#whatSports').addEventListener("change",function () {
    var majorNum = document.querySelector('#whatSports').value;
    socket.emit('major', majorNum);
    chrome.storage.sync.set({
        whatMajor:majorNum
    });

});