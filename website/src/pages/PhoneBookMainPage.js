import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Contact from '../Components/Contact';
import { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { sortContacts } from '../General/generalFunctions';


let con = 5
export default function PhoneBookMainPage() {
    const contactsInfo = JSON.parse(localStorage.getItem('contacts')) || []
    const [contacts, setContacts] = useState(contactsInfo.slice(0, 5))


    const searchContacts = (e) => {
        //this function gets a string and show all the contacts the contain this string
        const filteredContacts = contactsInfo.filter((contact) => contact.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setContacts(sortContacts(filteredContacts))
    }

    function handleScroll() {
        //this functionchecks if the user scrolled till the end and if it did, it will load more contacts(if there are more contacts)
        var isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
        if (isAtBottom && con < contactsInfo.length) {
            if (con + 5 >= contactsInfo.leangth) {
                con = contactsInfo.length
            } else {
                con += 5
            }
            setContacts([...contactsInfo.slice(0, con)])
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    })

    return (
        <Container>
                <NavBar search={searchContacts}></NavBar>
                <ListGroup as="ul">
                    {contacts.map((contact, index) => <ListGroup.Item key={index} action variant="light" ><Contact contact={contact} /></ListGroup.Item>)}
                </ListGroup>
        </Container>

    )
}
