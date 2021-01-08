var myTimeValue = myTimeValue || 
{
    Year  : 0,
    Month : 0,
    Date : 0,
    DayName : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    Day : 'Sun',
    Hour : 0,
    Minute : 0,
    Second : 0
};

myTimeValue.TimeSet = function (){

    let nowTime = new Date();

    myTimeValue.Hour = nowTime.getHours();
    myTimeValue.Minute = nowTime.getMinutes();
    myTimeValue.Second = nowTime.getSeconds();

}

myTimeValue.DaySet = function () {

    let nowTime = new Date();

    myTimeValue.Date = nowTime.getDate();
    myTimeValue.Year = nowTime.getFullYear();
    myTimeValue.Month = nowTime.getMonth() + 1;
    myTimeValue.Day = myTimeValue.DayName[nowTime.getDay()];
}

var myTimeApp = myTimeApp || {};

myTimeApp.Update_Day = function()
{
    let a = myTimeValue;
    a.DaySet();

    let msg = a.Year + "/" + a.Month + "/" + a.Date + "(" +
    a.Day + ")"
    document.getElementById("RealtimeClockDay").innerText = msg;
}

myTimeApp.Update_time = function()
{
    setTimeout(myTimeApp.Update_time, 1000);

    let a = myTimeValue;

    let Clock = document.getElementsByClassName("Clock")[0];

    if(a.Second == 0 || a.Second >= 59)
    {
        a.TimeSet();
        Clock.getElementsByClassName("Hour")[0].innerText = zero_padding(a.Hour);
        Clock.getElementsByClassName("Minute")[0].innerText = zero_padding(a.Minute);
    }
    else
    {
        a.Second++;
    }

    Clock.getElementsByClassName("Second")[0].innerText = zero_padding(a.Second);
    
    let colon = Clock.getElementsByClassName("Colon");
    for (let index = 0; index < colon.length; index++) {
        colon[index].classList.toggle("blink");
    }

    if(a.Hour == 0 && a.Minute == 0){myTimeApp.Update_Day();}

    function zero_padding(a) {
        let b = a < 10 ? "0" + a.toString() : a;
        return b;
    }
}

document.addEventListener
(
    'DOMContentLoaded',
    function()
    {
        myTimeApp.Update_Day();
        myTimeApp.Update_time();
    }
);
