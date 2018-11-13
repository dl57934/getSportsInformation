var socket = io.connect('http://172.30.1.3:8000');
socket.on('connect',function () {
   console.log('Client connected');
});

chrome.storage.sync.get(function (data) {
    if(data.whatMajor == null)socket.emit('major',data.whatMajor['whatMajor']);
    const {fullday, day} = getDate();
    document.getElementById("dateGame").innerHtml = day;
    document.querySelector("#whatSports").options[data.whatMajor['majorNum']-1].setAttribute('selected','selected');
    socket.emit('major', data.whatMajor['whatMajor']);
    
});
chrome.notifications.create({
    type: 'basic',
    iconUrl: 'basketball.jpeg',
    title: 'Kgc vs Lg',
    message: '예약하신 농구경기가 10분밖에 남지않았습니다.'
 }, function(notificationId) {});;

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
    const {fullday, day} = getDate(-1);
    document.getElementById("dateGame").innerHTML = day;
    var majorNum = document.querySelector('#whatSports').value;
    majorNum = majorNum.split(',');
    socket.emit('changeDay',{'fullday':fullday,'majorNum':majorNum});
});

const getDate = (clickNum = 0) =>{
    let date = new Date();
    let dd = date.getDate()+clickNum;
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
     if(dd <10) dd='0'+dd;
     if (mm<10) mm='0'+mm;
     const fullday = yyyy+''+mm+''+dd;
     const day = ' '+mm+'월 '+dd +'일 ';
     return {fullday, day};
}

document.querySelector('#rightArrow').addEventListener('click',()=>{
    $('.li').remove();
    $('#centerInfo > br').remove();
    const {fullday, day} = getDate(1);
    document.getElementById("dateGame").innerHTML = day;
    const majorNum = document.querySelector('#whatSports').value;
    majorNum = majorNum.split(',');
    socket.emit('changeDay',{'fullday':fullday,'majorNum':majorNum});
});
