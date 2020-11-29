//CUSTOM EVENTS
const quizFinishEvent = new Event('timerDone');

//OBJECT TEMPLATES
function User(score, name)
{
    this.Score = score;
    this.Name = name;
}

//array to be filled with user objects
var Users = [];

//how long user has to complete quiz
var time = 75;
var timerSpeed = 100;

//timer to show user how mush time they have left
var timer;

//HTML ELEMENTS
var timePTag = document.getElementById("Timer");

var startBtn = document.getElementById("startBtn");
var testBtn = document.getElementById("testBtn");


var submitHighscoreDiv = document.getElementById("submitHighscore");
var initalsInputEl = document.getElementById("initalsInput");
var submitInitalsBtn = document.getElementById("submitBtn");


function startTimer()
{
    //once timer starts disable start button
    startBtn.disabled = true;
    //start timer countdown
    timer = setInterval(function(){
        //decremnt time
        time--;
        //update timer on page
        timePTag.textContent = `${time} seconds remaining`;
        //console.log(time);
        //iff timer reaches 0 end quiz
        if(time == 0)
        {
            finishQuiz();
        }
    }, timerSpeed);
}

function getInput()
{
    //display input field for user to fill out and submit
    submitHighscoreDiv.setAttribute("style", "display: block;");
    //dont know why addclass or remove class arent working
    //submitHighscoreDiv.removeClass('hide');
}

function submitScore()
{
    //create a new USer object 
    //set score to remaing time
    //set name to input 
    var newUser = new User(parseInt(timePTag.textContent), initalsInputEl.value);
    //if users is empty push new user directly onto array
    if(Users.length == 0)
    {
        //alert("first user added")
        Users.push(newUser);
        //update highscore list on page
        //updateHighscoreList();
        localStorage.setItem("highscores", JSON.stringify(Users));

    }
    //otherwise go through arraay and place user on list based on their score
    else
    {
        //alert("gonna try and add a new user");
        //a bool to ensure user gets added to array
        var wasAdded = false;
        //go through Users array to compare scores
        for(var i = 0; i < Users.length; i++) 
        {
            //alert("im in the for loop");
            //check if new score is higher than score at the current index
            //of users array
            if(newUser.Score > Users[i].Score)
            {
                //confirm user is added
                wasAdded = true;
                //place user directly into array at proper index WITHOUT DELETING 
                //any users
                Users.splice(i, 0, newUser);
                //update highscore list on page
                //updateHighscoreList();
                localStorage.setItem("highscores", JSON.stringify(Users));

                //alert("new user added");
                //IMPORTANT MUST END FOR LOOP OTHERWISE WILL LOPP
                //INFINITLY BECAUSE LENGHT OF USERS ARRAY WILL ALWAYS BE GROWING
                break;
            }
        }

        //check if user has been added
        if(!wasAdded)
        {
            //alert("good thing you put this here")
            //if not that means they have the lowest score and can be pushed
            //right on to the back of the array
            Users.push(newUser);
            //update highscore list on page
            //updateHighscoreList();
            localStorage.setItem("highscores", JSON.stringify(Users));
        }
    }
    //reset page values
    reset();
}



function reset()
{
    //set display of inpout field to none
    submitHighscoreDiv.setAttribute("style", "display: none;");
    //reset time to default value should maybe not be hardcoded
    time = 75;
    //display reset time on page
    timePTag.textContent = `${time} seconds remaining`;
    //re-enable start button
    startBtn.disabled = false;
    //dont know why addclass or remove class arent working
    //submitHighscoreDiv.addClass(".hide");
}

function finishQuiz()
{
    //stop timer from running
    clearInterval(timer);
    //trigger quiz finsihed event
    submitHighscoreDiv.dispatchEvent(quizFinishEvent);
}

//display timer on screen on page start
timePTag.textContent = `${time} seconds remaining`;

//EVENT LISTENERS
//start timer on start button click
startBtn.addEventListener("click", startTimer);
//test button to end quiz early
testBtn.addEventListener("click", finishQuiz);
//submit user name and score when submit button is pressed
submitInitalsBtn.addEventListener("click", submitScore);
//display input field when quiz ends
submitHighscoreDiv.addEventListener("timerDone", getInput);