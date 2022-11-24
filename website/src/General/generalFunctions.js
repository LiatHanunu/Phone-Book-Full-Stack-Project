function sortContacts(contacts) {
    //this function gets an array of contacts and sorts them in descending order by their title(nickname or firstname + lastname)
    return contacts.sort((a, b) => {
        const nameA = a.title.toUpperCase() // ignore upper and lowercase
        const nameB = b.title.toUpperCase()  // ignore upper and lowercase
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


export {sortContacts}