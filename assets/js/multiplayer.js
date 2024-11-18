// Yoinking to test info
// 100% should be change once we have more time
window.addEventListener("load", (event) => {
    let games = getLocalStorage();
    const dropdown = document.querySelector('#dropdown');
    let gameTitleList;
    let gameTitleListInterim = [];
    if (games.length === 0) {
        console.log("INFO: No Games Found. Add some to help this application achieve glorious domination!")
    }else {
        //Collect all the game titles
        for (i = 0; i < games.length; i++){
            gameTitleListInterim.push(games[i].gameTitle);
            //run a duplicate check
            //Effectively, it appears any set MUST have unique values. Converting the array to a set and then back again removes the duplicates.
            gameTitleList = [... new Set(gameTitleListInterim)];
        }
        //render to the game list. This may need to be its own separate function. For MVP, it's probably fine.
        if (games.length === 0){
            console.log("INFO: No Games Found. Add some to help this application achieve glorious domination!")
        }else {
            for (i = 0; i < gameTitleList.length; i++){
                const game = document.createElement('option')
                game.textContent = gameTitleList[i];
                console.log (`INFO: game.textContent: ${game.textContent} should render to the screen`)
                dropdown.appendChild(game);
                game.setAttribute('id', `localstorage${i}`)
        }

        }
    }
})

function getLocalStorage() {
    let games = JSON.parse(localStorage.getItem('games'));
    if (!games) {
        console.log ("INFO: No Games Found, should return empty array.")
        return [];
    }
    return games;
}

function setLocalStorage(item) {
    let items = getLocalStorage();
    //push new item to items
    items.push(item);
    //save data to local storage after stringifying it.
    localStorage.setItem('items', JSON.stringify(items));
}

function domAppend(el, parent) {
    //append item to DOM using two arguments
    const element = document.createElement(el);
    parent.appendChild(element);
    return element
}


function createDataObject(event) {
    event.preventDefault();
    console.log("INFO: createDataObject was called.")
    
    if (gameTitleModal.value === "" || gameRatingModal.value === ""){ 
        const main = document.querySelector('#modal-body');
        const paragraphEl = domAppend('p', modalBody)
        paragraphEl.setAttribute('id', 'error')
        const error = document.querySelector('#error')
        error.textContent = "Please complete the required fields."
    }else {
        const gameTitle = document.querySelector('#gameTitle');
        const gameRating = document.querySelector('#gameRating');
        const wins = document.querySelector('#wins');
        const losses = document.querySelector('#losses');
        let journalEntry = {
            gameTitle : gameTitle.value,
            gameRating : rating.value,
            wins : wins.value,
            losses : losses.value
        };
        setLocalStorage(journalEntry);
        return journalEntry;
    }
}

let saveBtn = document.querySelector('gameForm')
saveBtn.addEventListener('submit', createDataObject)

//MP = Multiplayer (Competitve) -- Bowman
// function createDataObject {
// //     Name of Game
// // Wins (Number)
// // Losses (Number)
// // Rank (String)
// // Link to video (String)
// // Observations text area. (Text Area)
// }

// rendering -- Leo

function renderBlogPost() {
    const numberOfJournals = getLocalStorage.length;
    for (let i = 0; i > numberOfJournals; i++) {
        const main = document.querySelector('main');
        const recordDay = domAppend('div', main);
        recordDay.setAttribute('id', 'recordDay');
    }
}

//Add button to dropdown menu
const addGameBtn = document.querySelector('#add-game');
const gameTitle = document.querySelector('#gameTitle');
function addGame() {
    
    if (gameTitle.value !== "") {
        const dropdown = document.querySelector('#dropdown');
        const newGame = document.createElement('option');
        newGame.textContent = gameTitle.value;
        dropdown.appendChild(newGame);
        document.querySelector('#gameTitle').value = "";
    } else {
        alert("Please enter a game title.")
    }
}
    addGameBtn.addEventListener('click', addGame);