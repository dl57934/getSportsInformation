var socket = io.connect('http://192.168.99.100:8000');
socket.on('connect',function () {
   console.log('Client connected');
});
chrome.storage.sync.get(function (data) {
    if(data.whatMajor== null)socket.emit('major',data.whatMajor['whatMajor']);
    document.querySelector("#whatSports").options[data.whatMajor['majorNum']-1].setAttribute('selected','selected');
    socket.emit('major', data.whatMajor['whatMajor']);
});
let clickNum = 0;


document.querySelector('#whatSports').addEventListener("change",function () {
    var majorNum = document.querySelector('#whatSports').value;
    majorNum = majorNum.split(',');
    socket.emit('major', majorNum[0]);
    clickNum=0;
    try {
        chrome.storage.sync.set({
            whatMajor: {
                'whatMajor': majorNum[0]
                , 'majorNum': majorNum[1]
            }
        });

        $('.li').remove();
        $('#centerInfo > br').remove();
        $('#newsInfo > li').remove();
    }catch (err){

    }

});

document.querySelector('#leftArrow').addEventListener('click',()=>{
    $('.li').remove();
    $('#centerInfo > br').remove();
    clickNum -=1;
   let date = new Date();
   let dd = date.getDate()+clickNum;
   let mm = date.getMonth()+1;
   let yyyy = date.getFullYear();
    if(dd <10) dd='0'+dd;
    if (mm<10) mm='0'+mm;
    var fullday = yyyy+''+mm+''+dd;
    var majorNum = document.querySelector('#whatSports').value;
    majorNum = majorNum.split(',');
    socket.emit('changeDay',{'fullday':fullday,'majorNum':majorNum});
});
document.querySelector('#rightArrow').addEventListener('click',()=>{
    $('.li').remove();
    $('#centerInfo > br').remove();
    clickNum +=1;
    let date = new Date();
    let dd = date.getDate()+clickNum;
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd <10) dd='0'+dd;
    if (mm<10) mm='0'+mm;
    var fullday = yyyy+''+mm+''+dd;
    var majorNum = document.querySelector('#whatSports').value;
    majorNum = majorNum.split(',');
    socket.emit('changeDay',{'fullday':fullday,'majorNum':majorNum});
});
