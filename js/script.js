// simple test to ensure things are working.
alert("script.js is attached correctly");

/** 
 * GetLocalStorage
 * Gets key from local storage
 * Values: Key - The value taken from storage
*/
function getLocalStorage(key) {
    let journalEntry = JSON.parse(localStorage.getItem(key));
    if (journalEntry === null) {
        return [];
    }
    return journalEntry;
}

function setLocalStorage(item) {
    // Has no fail safe for NULL values

    JSON.stringify.localStorage.setItem(item);
}