// simple test to ensure things are working.
alert("script.js is attached correctly");

/** 
 * GetLocalStorage
 * Gets key from local storage
 * Values: Key - The value taken from storage
*/
// JB Note: I've removed key from the argument. While I understand it's suppose to pass in a key... I'm not sure that's entirely working.
function getSPLocalStorage() {
    //replaced key with hard coded 'items' value for single player. If we need to split SP/MP journal entries, we may need to split off SP/MP keys. Leo, can you think of a better way? Maybe object creation function returns a key somehow?
    let journalEntry = JSON.parse(localStorage.getItem('sPItems'));
    if (journalEntry === null) {
        return [];
    }
    return journalEntry;
}

function setSPLocalStorage(item) {
    // Has no fail safe for NULL values
    //JB: There should be a check on SP to prevent blank items from being entered. Depending on how many more key/value pairs there are it may be best to split that off into a different function
    // check to see if local storage already has data.
    let items = getSPLocalStorage();
    //push new item to items
    items.push(item);
    //save data to local storage after stringifying it.
    localStorage.setItem('sPItems', JSON.stringify(items));
}

/** 
 * GetLocalStorage
 * Gets key from local storage
 * Values: Key - The value taken from storage
*/
// JB Note: I've removed key from the argument. While I understand it's suppose to pass in a key... I'm not sure that's entirely working.
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

// pulling from journal modal
//SP = SinglePlayer 
function createSPDataObject(event) {
    event.preventDefault();
    console.log("INFO: createSPDataObject was called.")
// This function takes input from the modal, creates and object and passes the information to setLocalStorage
    // Setup query selectors
const gameTitle = document.querySelector('#game-title');
const rating = document.querySelector('#game-rating');
//Placeholder for completed (boolean)
//Placeholder for Prompt
//Placeholder for other data that might come up?
    if (gameTitle.value === "" || rating.value === ""){
        // return error message -- 
        const main = document.querySelector('main');
        const paragraphEl = domAppend('p', main)
        paragraphEl.setAttribute('id', 'error')
        const error = document.querySelector('#error')
        error.textContent = "Please complete the required fields."
    } else {
        let sPJournalEntry = {
            //this first key value pair is not working. TODO: Why is that? Is it because of the dash?
            gameTitle : gameTitle.value,
            rating : rating.value
            //There will be more here. Feel free to add more key/value pairs
        };
        setSPLocalStorage(sPJournalEntry);
        return sPJournalEntry;
    }


    // generic function to append an element to a page
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

renderMPBlogPost() {
    const numberOfJournals = getMPLocalStorage.length;
    for (let i = 0; i > numberOfJournals; i++) {
        const main = document.querySelector('main');
        const recordDay = domAppend('div', main);
        recordDay.setAttribute('id', 'recordDay')
    }
}

//TODO: Change the event listener. This is simply to test the function
let submitBtn = document.querySelector('#game-form')
submitBtn.addEventListener('submit', createSPDataObject)


