var hsList = document.getElementById("highscoresList");
var clearBtn = document.getElementById("clearBtn");

function updateHighscoreList()
{
    //get highscore from localstorage or creater empty array
    var Users = JSON.parse(window.localStorage.getItem("highscores")) || [];


    //if there is only one object in array just append a new <li>
    if(Users.length == 1)
    {
        //create list item to add
        var listItem = document.createElement('li');
        //set text of list item to user name and score
        listItem.textContent = `${Users[0].Name} - ${Users[0].Score}`;
        //addit to html
        hsList.append(listItem); 
    }
    //otherwise destroy list and recreate with new user
    else
    {
        //clear list so we can recreate with new user
        clearHighscores();
        //recreate list with new user
        for(var i = 0; i < Users.length; i++)
        {
            //create list item
            var listItem = document.createElement('li');
            //set text of list item to user name and score
            listItem.textContent = `${Users[i].Name} - ${Users[i].Score}`;
            //alert(listItem.textContent);
            hsList.append(listItem);  
        }
    }
}

function clearHighscores()
{
    //remove highscores key from localstorage
    window.localStorage.removeItem("highscores");
}



updateHighscoreList();


clearBtn.addEventListener("click", clearHighscores);
