//On Load, check the local storage for existing games.
window.addEventListener("load", (event) => {
    // This may need to be its own separate function. For MVP, it's fine.
    let spGames = getSPLocalStorage();
    const dropdown = document.querySelector('#dropdown');
    let spGameTitleList;
    let spGameTitleListInterim = [];
    if (spGames.length === 0) {
        console.log("INFO: No Games Found. Add some to help this application achieve glorious domination!")
    }else {
        //Collect all the game titles
        for (i = 0; i < spGames.length; i++){
            spGameTitleListInterim.push(spGames[i].gameTitle);
            //run a duplicate check
            //Effectively, it appears any set MUST have unique values. Converting the array to a set and then back again removes the duplicates.
            spGameTitleList = [... new Set(spGameTitleListInterim)];
        }
        //render to the game list. This may need to be its own separate function. For MVP, it's probably fine.
        if (spGames.length === 0){
            console.log("INFO: No Games Found. Add some to help this application achieve glorious domination!")
        }else {
            for (i = 0; i < spGameTitleList.length; i++){
                const spGame = document.createElement('option')
                spGame.textContent = spGameTitleList[i];
                console.log (`INFO: spGame.textContent: ${spGame.textContent} should render to the screen`)
                dropdown.appendChild(spGame);
                spGame.setAttribute('id', `localstorage${i}`)
        }

        }
    }
})

function getSPLocalStorage() {

    let spGames = JSON.parse(localStorage.getItem('spGames'));
    if (!spGames) {
        console.log ("INFO: No SP Games Found, should return empty array.")
        return [];
    }
    return spGames;
}

function setSPLocalStorage(spGame) {
    let spGames = getSPLocalStorage();
    //push new item to items
    spGames.push(spGame);
    //save data to local storage after stringifying it.
    localStorage.setItem('spGames', JSON.stringify(spGames));
}
function domAppend(el, parent) {
    //append item to DOM using two arguments
    const element = document.createElement(el);
    parent.appendChild(element);
    return element
}

function createSPDataObject(event) {
    event.preventDefault();
    console.log("INFO: createSPDataObject was called.")
    if (spGameTitleModal.value === "" || spGameRatingModal.value === ""){
        // return error message on the modal
        const modalBody = document.querySelector('#modal-body');
        const paragraphEl = domAppend('p', modalBody)
        paragraphEl.setAttribute('id', 'error')
        const error = document.querySelector('#error')
        error.textContent = "Please complete the required fields."
    } else {
        const spGameTitleModal = document.querySelector('#spGameTitleModal');
        const spDateModal = document.querySelector('#spDateModal');
        const spGameRatingModal = document.querySelector('#spGameRatingModal');
        const spGameComments = document.querySelector('#spGameComments');
        //This is the best option available to ensure ease of reading. If the ':checked' is not added, then by default system will grab whatever the first value is.
        const spGameCompleted = document.querySelector('input[name="spGameCompleted"]:checked');
        let spGame = {
            gameTitle : spGameTitleModal.value,
            date : spDateModal.value,
            rating : spGameRatingModal.value,
            completed : spGameCompleted.value,
            comments : spGameComments.value
        };
        setSPLocalStorage(spGame);
        //simply made available for future development if needed.
        return spGame;
    }
}


//This is tied to the Modal Save button now.
let saveBtn = document.querySelector('#spGameForm')
saveBtn.addEventListener('submit', createSPDataObject)

//Add button to dropdown menu
const addGameBtn = document.querySelector('#add-game');
const gameTitle = document.querySelector('#gameTitle');
function addGame() {
    
    if (gameTitle.value !== "") {
        const dropdown = document.querySelector('#dropdown');
        const newGame = document.createElement('option');
        const spGameTitle = document.querySelector('#spGameTitle')
        newGame.textContent = gameTitle.value;
        dropdown.appendChild(newGame);
        document.querySelector('#gameTitle').value = "";
        document.querySelector('#spGameTitle').value = "";
        //JB Additions: Future development, perhaps or code cleanup.
        return spGameTitle;
    } else {
        alert("Please enter a game title.")
    }
}
    addGameBtn.addEventListener('click', addGame); 