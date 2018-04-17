var socket = io.connect('http://127.0.0.1:3002');
socket.on('connect',function () {
   console.log('Client connected');
});