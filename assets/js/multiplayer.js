function getMPLocalStorage() {
    //replaced key with hard coded 'items' value for single player. If we need to split SP/MP journal entries, we may need to split off SP/MP keys. Leo, can you think of a better way? Maybe object creation function returns a key somehow?
    let journalEntry = JSON.parse(localStorage.getItem('mPitems'));
    if (journalEntry === null) {
        return [];
    }
    return journalEntry;
}

function setMPLocalStorage(item) {
    // Has no fail safe for NULL values
    //JB: There should be a check on MP to prevent blank items from being entered. Depending on how many more key/value pairs there are it may be best to split that off into a different function
    // check to see if local storage already has data.
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
const gameTitle = document.querySelector('#game-title');
function addGame() {
    
    if (gameTitle.value !== "") {
        const dropdown = document.querySelector('#dropdown');
        const newGame = document.createElement('option');
        newGame.textContent = gameTitle.value;
        dropdown.appendChild(newGame);
        document.querySelector('#game-title').value = "";
    } else {
        alert("Please enter a game title.")
    }
}
    addGameBtn.addEventListener('click', addGame);