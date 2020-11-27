const quizFinishEvent = new Event('timerDone');

function User(score, name)
{
    this.Score = score;
    this.Name = name;
}

var Users = [];

var time = 75;

var timer;

var timePTag = document.getElementById("Timer");

var startBtn = document.getElementById("startBtn");
var testBtn = document.getElementById("testBtn");

var hsList = document.getElementById("highscoresList");

var submitHighscoreDiv = document.getElementById("submitHighscore");
var initalsInputEl = document.getElementById("initalsInput");
var submitInitalsBtn = document.getElementById("submitBtn");

function startTimer(){
    startBtn.disabled = true;
    timer = setInterval(function(){
        time--;
        timePTag.textContent = `${time} seconds remaining`;
        //console.log(time);
        if(time == 0)
        {
            finishQuiz();
        }
    }, 1000);
}

function getInput(){
    submitHighscoreDiv.setAttribute("style", "display: block;");
    //dont know why addclass or remove class arent working
    //submitHighscoreDiv.removeClass('hide');
}

function submitScore()
{
var newUser = new User(parseInt(timePTag.textContent), initalsInputEl.value);
    if(Users.length == 0)
    {
        //alert("first user added")
        Users.push(newUser);
        updateHighscoreList();
    }
    else
    {
        //alert("gonna try and add a new user");
        var wasAdded = false;

        for(var i = 0; i < Users.length; i++) 
        {
            //alert("im in the for loop");
            if(newUser.Score > Users[i].Score)
            {
                wasAdded = true;
                Users.splice(i, 0, newUser);
                updateHighscoreList();
                //alert("new user added");
                break;
            }
        }

        if(!wasAdded)
        {
            //alert("good thing you put this here")
            Users.push(newUser);
            updateHighscoreList();
        }
    }
    reset();
}


function updateHighscoreList()
{
    if(Users.length == 1)
    {
        var listItem = document.createElement('li');
        listItem.textContent = `${Users[0].Name} - ${Users[0].Score}`;
        //alert(listItem.textContent);
        hsList.append(listItem); 
    }
    else
    {
        while(hsList.firstChild)
        {
            hsList.removeChild(hsList.firstChild);
        }
        for(var i = 0; i < Users.length; i++)
        {
            var listItem = document.createElement('li');
            listItem.textContent = `${Users[i].Name} - ${Users[i].Score}`;
            //alert(listItem.textContent);
            hsList.append(listItem);  
        }
    }
    //alert("user added!");
}

function reset()
{
    submitHighscoreDiv.setAttribute("style", "display: none;");
    
    time = 75;
    timePTag.textContent = `${time} seconds remaining`;
    startBtn.disabled = false;
    //dont know why addclass or remove class arent working
    //submitHighscoreDiv.addClass(".hide");
}

function finishQuiz()
{
    clearInterval(timer);
    submitHighscoreDiv.dispatchEvent(quizFinishEvent);
}


timePTag.textContent = `${time} seconds remaining`;
startBtn.addEventListener("click", startTimer);
testBtn.addEventListener("click", finishQuiz);
submitInitalsBtn.addEventListener("click", submitScore);
submitHighscoreDiv.addEventListener("timerDone", getInput);