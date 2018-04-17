var socket = io.connect('http://127.0.0.1:8000');
socket.on('connect',function () {
   console.log('Client connected');
});