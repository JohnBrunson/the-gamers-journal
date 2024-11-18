// Yoinking to test info
window.addEventListener("load", (event) => {
    let mpGames = getMPLocalStorage();
    const dropdown = document.querySelector('#dropdown');
    let mpGameTitleList;
    let mpGameTitleListInterim = [];
    if (mpGames.length === 0) {
        console.log("INFO: No Games Found. Add some to help this application achieve glorious domination!")
    }else {
        //Collect all the game titles
        for (i = 0; i < mpGames.length; i++){
            mpGameTitleListInterim.push(mpGames[i].gameTitle);
            //run a duplicate check
            //Effectively, it appears any set MUST have unique values. Converting the array to a set and then back again removes the duplicates.
            mpGameTitleList = [... new Set(mpGameTitleListInterim)];
        }
        //render to the game list. This may need to be its own separate function. For MVP, it's probably fine.
        if (mpGames.length === 0){
            console.log("INFO: No Games Found. Add some to help this application achieve glorious domination!")
        }else {
            for (i = 0; i < mpGameTitleList.length; i++){
                const mpGame = document.createElement('option')
                mpGame.textContent = mpGameTitleList[i];
                console.log (`INFO: mpGame.textContent: ${mpGame.textContent} should render to the screen`)
                dropdown.appendChild(mpGame);
                mpGame.setAttribute('id', `localstorage${i}`)
        }

        }
    }
})

function getMPLocalStorage() {
    let mpGames = JSON.parse(localStorage.getItem('spGames'));
    if (!spGames) {
        console.log ("INFO: No SP Games Found, should return empty array.")
        return [];
    }
    return mpGames;
}

function setMPLocalStorage(item) {
    let items = getMPLocalStorage();
    //push new item to items
    items.push(item);
    //save data to local storage after stringifying it.
    localStorage.setItem('mPitems', JSON.stringify(items));
}

function domAppend(el, parent) {
    //append item to DOM using two arguments
    const element = document.createElement(el);
    parent.appendChild(element);
    return element
}


function createMPDataObject(event) {
    event.preventDefault();
    console.log("INFO: createMPDataObject was called.")
}

const mpGameTitle = document.querySelector('#mpGameTitle');
const mpRating = document.querySelector('#mpRating');
const mpWins = document.querySelector('#mpWins');
const mpLosses = document.querySelector('#mpLosses');

if (mpGameTitle.value === "" || mpRating.value === "" || mpWins.value === "" || mpLosses.value){
    // return error message -- 
    const main = document.querySelector('main');
    const paragraphEl = domAppend('p', main)
    paragraphEl.setAttribute('id', 'error')
    const error = document.querySelector('#error')
    error.textContent = "Please complete the required fields."
}else {
    let mPJournalEntry = {
        mpGameTitle : mpGameTitle.value,
        mpRating : mpRating.value,
        mpWins : mpWins.value,
        mpLosses : mpLosses.value
    };
    setMPLocalStorage(mPJournalEntry);
    return mPJournalEntry;
}
   

//MP = Multiplayer (Competitve) -- Bowman
// function createMPDataObject {
// //     Name of Game
// // Wins (Number)
// // Losses (Number)
// // Rank (String)
// // Link to video (String)
// // Observations text area. (Text Area)
// }

// rendering -- Leo

function renderMPBlogPost() {
    const numberOfJournals = getMPLocalStorage.length;
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