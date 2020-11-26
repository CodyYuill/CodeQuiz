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
    
    //TODO also submit whatever score the user gets
    /*TODO run through list to determine where highscore should be placed on list 
    list.insertBefore(newItem, list.childNodes[0]);  // Insert <li> before the first child of <ul>
    */

    reset();
}

function reset()
{
    submitHighscoreDiv.setAttribute("style", "display: none;");
    time = 75;
    timePTag.textContent = `${time} seconds remaining`;
    startBtn.disabled = false;
}



timePTag.textContent = `${time} seconds remaining`;
startBtn.addEventListener("click", startTimer);
submitInitalsBtn.addEventListener("click", submitScore);
submitHighscoreDiv.addEventListener("timerDone", getInput);