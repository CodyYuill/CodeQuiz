const timerFinishEvent = new Event('timerDone');

var time = 75;
var timePTag = document.getElementById("Timer");
var startBtn = document.getElementById("startBtn");
var hsList = document.getElementById("highscoresList");
var initialInput = document.getElementById("initialInput");

function startTimer(){
    var timer = setInterval(function(){
        time--;
        timePTag.textContent = `${time} seconds remaining`;
        console.log(time);
        if(time == 0)
        {
            clearInterval(timer);
            //TODO call custom event
            initialInput.dispatchEvent(timerFinishEvent);
        }
    }, 1000);
}

function getInput(){
    initialInput.setAttribute("style", "display: block;");
}



timePTag.textContent = `${time} seconds remaining`;
startBtn.addEventListener("click", startTimer);
initialInput.addEventListener("timerDone", getInput);