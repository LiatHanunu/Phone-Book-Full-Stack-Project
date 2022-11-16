function sortContacts(contacts) {
    //this function gets an array of contacts and sorts them in descending order.
    //it will sort the contats by the title they are represented in(nickname or first Name + last Name)
    return contacts.sort((a, b) => {
        const nameA = a.nickname.toUpperCase() || a.firstName.concat(a.lastName).toUpperCase(); // ignore upper and lowercase
        const nameB = b.nickname.toUpperCase() || b.firstName.concat(b.lastName).toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
            return -1;
        }
        else if (nameA < nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    })

}

function newContactsSlice(contacts, start, end){
    //this function returns a slice of the array
    return contacts.slice(start, end)
}

export {sortContacts, newContactsSlice}