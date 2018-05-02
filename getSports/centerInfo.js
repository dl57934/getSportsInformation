socket.on('centerInfo',function (data) {
    alert(data['gameInfo'].split(','));
});