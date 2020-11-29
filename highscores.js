var hsList = document.getElementById("highscoresList");
var clearBtn = document.getElementById("clearBtn");

function updateHighscoreList()
{
    var Users = JSON.parse(localStorage.getItem("highscores")) || [];

    //if there is only one object in array just append a new <li>
    if(Users.length == 1)
    {
        //create list item to add
        var listItem = document.createElement('li');
        //set text of list item to user name and score
        listItem.textContent = `${Users[0].Name} - ${Users[0].Score}`;
        //alert(listItem.textContent);
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
    //alert("user added!");
}

function clearHighscores()
{
    
    //loop through the list while it has a firstchild
    //if no first child list is empty and will breal loop
    while(hsList.firstChild)
    {
        //remove the first child from list
        hsList.removeChild(hsList.firstChild);
    }

    localStorage.setItem("highscores", "");
}



updateHighscoreList();


clearBtn.addEventListener("click", clearHighscores);
