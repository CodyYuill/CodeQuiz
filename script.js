var time = 75;
var timePTag = document.querySelector("#Timer");
var startBtn = document.getElementById("startBtn");
function startTimer(){
    var timer = setInterval(function(){
        time--;
        timePTag.textContent = `${time} seconds remaining`;
        console.log(time);
        if(time == 0)
        {
            clearInterval(timer);
        }
    }, 1000);
}

//TODO start timer on button press
timePTag.textContent = `${time} seconds remaining`;
startBtn.addEventListener("click", startTimer);