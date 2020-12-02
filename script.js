//CUSTOM EVENTS
const quizFinishEvent = new Event('timerDone');

//OBJECT TEMPLATES
function User(score, name)
{
    this.Score = score;
    this.Name = name;
}


//how long user has to complete quiz
var time = 75;
var timerSpeed = 1000;

//timer to show user how much time they have left
var timer;

//index of current question
var currentQuestion = 0;

//HTML ELEMENTS
var timePTag = document.getElementById("Timer");

var startArea = document.getElementById("startArea");
var startBtn = document.getElementById("startBtn");
var testBtn = document.getElementById("testBtn");

var questionArea = document.getElementById("questionArea");
var rightWrongText = document.getElementById("rightWrongText");


var submitHighscoreDiv = document.getElementById("submitHighscore");
var initialsInputEl = document.getElementById("initialsInput");
var submitInitialsBtn = document.getElementById("submitBtn");


function startQuiz()
{
    //start quiz timer
    startTimer();
    //hide start area
    startArea.setAttribute("class", "hide");
    //unhide question area
    questionArea.removeAttribute("class", "hide");
    //start displaying questions
    displayNextQuestion();
}

function displayNextQuestion()
{
    //get the current question
    var question = questions[currentQuestion];
    //access needed html elements
    var questionsDiv = document.getElementById("questions");
    var questionTitle = document.getElementById("Title");
    //display the question to user
    questionTitle.textContent = question.title;
    //clear question choices
    questionsDiv.innerHTML = "";
    //add choices for current question
    question.choices.forEach(function(choice, i) {
        //create the button
        var choiceBtn = document.createElement("button");
        //give it a class for formatting
        choiceBtn.setAttribute("class", "choiceBtn");
        //set the button data to choice string to compare to answer
        choiceBtn.setAttribute("data-answer", choice);
        //add event listener for button onclick to check answer
        choiceBtn.onclick = checkAnswer;
        //set button text to choice
        choiceBtn.textContent = `${i+1}. ${choice}`;
        //add button to html
        questionsDiv.appendChild(choiceBtn);
    });
}

function checkAnswer()
{
    //get current question
    var question = questions[currentQuestion];
    //get questions answer
    var answer = question.answer;
    
    //is answer wrong
    if(this.getAttribute("data-answer") !== answer)
    {
        //apply time penalty
        timePenalty();
        //apply time change o display
        timePTag.textContent = `${time} seconds remaining`;
        //notify user they are wrong
        displayRightOrWrong("Incorrect");
    }
    //is answer right
    else
    {
        //notify user they are right
        displayRightOrWrong("Correct");
    }
    //increment question index
    currentQuestion++;

    //if that was last question
    if(currentQuestion >= questions.length)
    {
        //finsih quiz
        finishQuiz();
    }
    else
    {
        //otherwise go to next question
       displayNextQuestion();
    }
}

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
    submitHighscoreDiv.removeAttribute("class", "hide");
}

function submitScore(e)
{
    e.preventDefault();
    //get highscores from loaclastorage or create an empty array
    var Users = JSON.parse(window.localStorage.getItem("highscores")) || [];

    //create a new USer object 
    //set score to remaining time
    //set name to input 
    var newUser = new User(parseInt(timePTag.textContent), initialsInputEl.value);
    //if users is empty push new user directly onto array
    if(Users.length == 0)
    {
        Users.push(newUser);
        //update highscore list on local storage
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
            //check if new score is higher than score at the current index
            //of users array
            if(newUser.Score > Users[i].Score)
            {
                //confirm user is added
                wasAdded = true;
                //place user directly into array at proper index WITHOUT DELETING 
                //any users
                Users.splice(i, 0, newUser);
                //update highscore list on localstorage
                localStorage.setItem("highscores", JSON.stringify(Users));
                //IMPORTANT MUST END FOR LOOP OTHERWISE WILL LOOP
                //INFINITLY BECAUSE LENGHT OF USERS ARRAY WILL ALWAYS BE GROWING
                break;
            }
        }

        //check if user has been added
        if(!wasAdded)
        {
            //if not that means they have the lowest score and can be pushed
            //right on to the back of the array
            Users.push(newUser);
            //update highscore list on localstorage
            localStorage.setItem("highscores", JSON.stringify(Users));
        }
    }
    //bring user to highscore page
    window.location.href = "highscores.html";
}

function reset()
{
    //set curernt question to first question
    currentQuestion = 0;
    //hide and unhide necessary areas
    submitHighscoreDiv.setAttribute("class", "hide");
    startArea.removeAttribute("class", "hide");
    questionArea.setAttribute("class", "hide");


    //reset time to default value should maybe not be hardcoded
    time = 75;
    //display reset time on page
    timePTag.textContent = `${time} seconds remaining`;
    //re-enable start button
    startBtn.disabled = false;
}

function finishQuiz()
{
    //stop timer from running
    clearInterval(timer);
    //hide question area
    questionArea.setAttribute("class", "hide");

    //trigger quiz finsihed event
    submitHighscoreDiv.dispatchEvent(quizFinishEvent);
}

function timePenalty()
{
    //take 15 seconds away
    time -= 15;
    //is time under 0?
    if(time <= 0)
    {
        //set time to zero so timer doesnt go vor ever
        time = 0;
        //display timer on page
        timePTag.textContent = `${time} seconds remaining`;
        //stop timer
        clearInterval(timer);
        //end quiz
        finishQuiz();
    }
}

function displayRightOrWrong(text)
{
    //set to proper class for color 
    rightWrongText.setAttribute("class", text);
    //set text 
    rightWrongText.textContent = text;
    //after one second reset to blank so it doesnt appear anymore
    window.setTimeout(function(){
        rightWrongText.textContent = "";
        rightWrongText.removeAttribute("class");

    }, 1000);
}

//ensure everything is set properly when we enter the main page 
reset();
//display timer on screen on page start
timePTag.textContent = `${time} seconds remaining`;

//EVENT LISTENERS
//start quiz on start button click
startBtn.addEventListener("click", startQuiz);
//submit user name and score when submit button is pressed or when enter is hit
submitHighscoreDiv.addEventListener("submit", submitScore, false);

//display input field when quiz ends
submitHighscoreDiv.addEventListener("timerDone", getInput);










//list of questions
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];