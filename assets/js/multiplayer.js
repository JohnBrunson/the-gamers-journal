// Yoinking to test info
// 100% should be change once we have more time
window.addEventListener("load", (event) => {
    let games = getLocalStorage();
    const dropdown = document.querySelector('#dropdown');
    let gameTitleList;
    let gameTitleListInterim = [];
    if (games.length === 0) {
        console.log("!!INFO: No Games Found. Add some to help this application achieve glorious domination!")
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
            console.log("?INFO: No Games Found. Add some to help this application achieve glorious domination!")
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
    let games = JSON.parse(localStorage.getItem('mpGames'));
    if (!games) {
        console.log ("INFO: No Games Found, should return empty array.")
        return [];
    }
    return games;
}

function setLocalStorage(game) {
    let mpGames = getLocalStorage();
    //push new item to items
    mpGames.push(game);
    //save data to local storage after stringifying it.
    localStorage.setItem('mpGames', JSON.stringify(mpGames));
}

function domAppend(el, parent) {
    //append item to DOM using two arguments
    const element = document.createElement(el);
    parent.appendChild(element);
    return element;
}

function createDataObject(event) {
    event.preventDefault();
    console.log("INFO: createDataObject was called.");
    
    if (gameTitleModal.value === "" || gameRatingModal.value === ""){ 
        const main = document.querySelector('#modal-body');
        const paragraphEl = domAppend('p', modalBody);
        paragraphEl.setAttribute('id', 'error');
        const error = document.querySelector('#error');
        error.textContent = ("Please complete the required fields.");
    }else {
        const gameTitle = document.querySelector('#gameTitleModal');
        const gameRating = document.querySelector('#gameRatingModal');
        const date = document.querySelector("#dateModal");
        const wins = document.querySelector('#winsModal');
        const losses = document.querySelector('#lossesModal');
        const rank = document.querySelector('#rankModal');
        const video = document.querySelector('#videoModal');
        const comments = document.querySelector('#commentsModal');

        let journalEntry = {
            gameTitle : gameTitle.value,
            gameRating : gameRating.value,
            date : date.value,
            wins : wins.value,
            losses : losses.value,
            rank : rank.value,
            video : video.value,
            comments : comments.value
        };
        setLocalStorage(journalEntry);
        return journalEntry;
    }
}

function articleGarbageCleanup() {
    const article = document.querySelector('article');
    if (!article){
        console.log ("No Articles Found")
    }
    else{
        article.remove();
    }
}

function renderJournalEntry(journalEntry) {
    const main = document.querySelector('main');
    const article = domAppend('article', main);
    const h2 = domAppend('h2', article);
    h2.textContent = journalEntry.date;
    console.log(journalEntry);
    const p = domAppend('p', article);
    p.textContent = journalEntry.comments;
    article.classList.add('container', 'col-md-6');
}

function renderJournalEntries() {
    articleGarbageCleanup();
    const journalEntries = getLocalStorage();
    
    if (dropdown.value === "default"){
        console.log("no game selected");
    }
    for (let i = 0; i < journalEntries.length; i++) {
        if (dropdown.value === journalEntries[i].gameTitle){
            renderJournalEntry(journalEntries[i]);
        }
    }
}

// tied to Modal Save button
let saveBtn = document.querySelector('#gameForm')
saveBtn.addEventListener('submit', createDataObject)

//Add button to dropdown menu
const addGameBtn = document.querySelector('#add-game');
const gameTitle = document.querySelector('#gameTitle');
function addGame() {
    
    if (gameTitle.value !== "") {
        const dropdown = document.querySelector('#dropdown');
        const newGame = document.createElement('option');
        const gameTitle = document.querySelector('#gameTitle')
        newGame.textContent = gameTitle.value;
        dropdown.appendChild(newGame);
        document.querySelector('#gameTitle').value = "";
        return gameTitle;
    } else {
        alert("Please enter a game title.")
    }
}

addGameBtn.addEventListener('click', addGame);

const dropdown = document.querySelector('#dropdown');
dropdown.addEventListener('change', renderJournalEntries);