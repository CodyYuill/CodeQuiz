const timerFinishEvent = new Event('timerDone');

var time = 75;
var timePTag = document.getElementById("Timer");

var startBtn = document.getElementById("startBtn");

var hsList = document.getElementById("highscoresList");

var submitHighscoreDiv = document.getElementById("submitHighscore");
var initalsInputEl = document.getElementById("initalsInput");
var submitInitalsBtn = document.getElementById("submitBtn");

function startTimer(){
    startBtn.disabled = true;
    var timer = setInterval(function(){
        time--;
        timePTag.textContent = `${time} seconds remaining`;
        //console.log(time);
        if(time == 0)
        {
            clearInterval(timer);
            submitHighscoreDiv.dispatchEvent(timerFinishEvent);
        }
    }, 1);
}

function getInput(){
    submitHighscoreDiv.setAttribute("style", "display: block;");
}
function submitScore(){
    var listItem = document.createElement('li');
    listItem.textContent = initalsInputEl.value;
    alert(listItem.textContent);
    hsList.append(listItem);
    submitHighscoreDiv.setAttribute("style", "display: none;");
    time = 75;
    timePTag.textContent = `${time} seconds remaining`;
    startBtn.disabled = false;
    //TODO also submit whatever score the user gets
}



timePTag.textContent = `${time} seconds remaining`;
startBtn.addEventListener("click", startTimer);
submitInitalsBtn.addEventListener("click", submitScore);
submitHighscoreDiv.addEventListener("timerDone", getInput);