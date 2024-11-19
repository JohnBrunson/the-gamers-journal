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
    if (spGameTitleModal.value === "" || spGameRatingModal.value === ""||spDateModal.value === ""||spGameComments.value === ""){
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
        //This is the best option available to ensure ease of reading. If the ':checked' is not added, then by default querySelector will grab whatever the first value is.
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

function articleGarbageCleanup() {
    const article = document.querySelector('article');
    if (!article){
        console.log ("No Articles Found")
    }
    else{
        article.remove();
    }

}
// this doesn't clean up after itself
//CSS doesn't stack correctly.
function renderSPJournalEntries () {
    // effectively, a check needs to happen if an article is rendered. If there is, clean it up. If not, proceed.
    articleGarbageCleanup();
    const spGames = getSPLocalStorage();
    if (dropdown.value === "default"){
        console.log('INFO:No Game Selected')
    } else{
        for (i=0; i < spGames.length; i++){
            const spMatchingEntries = []
            //if the dropdown matches the title in the list, 
            if (dropdown.value === spGames[i].gameTitle){
                spMatchingEntries.push(spGames[i])
                //access the data by rendering it by item
            }
       //rendering
       if (spMatchingEntries.length > 0){
        const spGameTitle = document.querySelector('#spGameTitle')
        const spGameRating = document.querySelector('#spGameRating')
        spGameTitle.value = spMatchingEntries[0].gameTitle;
        spGameRating.value = spMatchingEntries[0].rating;
    }
        spMatchingEntries.forEach(entry => {
            const main = document.querySelector('main')
            //setup a div Not used, but keeping this code in case automatically assigning an id is needed.
           // const div = domAppend('div', main)
            //div.classList.add('container', 'mb-4')
            //assign div ID of blogentry + i
           // div.setAttribute('id', `blogEntry${i}`)
            //setup the article and append
            const article = domAppend('article', main);
            //setup the h2 and append to article. From a semantic standpoint, this could be argued to be date time. Not sure If I have enough time to hammer that out here... prior to deadline
            const h2 = domAppend('h2', article);
            h2.textContent = entry.date;
            //setup the paragraph and append to h2
            const p = domAppend('p', article);
            p.textContent = entry.comments;
            //adding bootstrap container
            article.classList.add('container', 'col-md-6')
        //IDEA: Maybe have everything attach to its own section, then hammer out how that should appear?

            })            
        }
    }
}


//This is tied to the Modal Save button now.
let saveBtn = document.querySelector('#spGameForm')
saveBtn.addEventListener('submit', createSPDataObject)

//Add button to dropdown menu
const addGameBtn = document.querySelector('#add-game');
const gameTitle = document.querySelector('#gameTitle');
function addGame() {
    //should probably be a check here if the game is in storage. If it is, call the modal with that title populated. That or ax the add button.
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

//Important to leave parenthesis off for this, otherwise, event handler doesn't call it, we do. That's not what we want here. This will call every time the value of the dropdown changes. renderSP Journal Entries could be called onLoad if we decided to get rid of default value of "--Select a Game--"
const dropdown = document.querySelector('#dropdown');
dropdown.addEventListener('change', renderSPJournalEntries);