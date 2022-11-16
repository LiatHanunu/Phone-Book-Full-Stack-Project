import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Contact from '../Components/Contact';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import { newContactsSlice, sortContacts } from '../General/generalFunctions';









let con = 5
export default function PhoneBookMainPage() {
    const contactsInfo = JSON.parse(localStorage.getItem('contacts')) || []
    const [contacts, setContacts] = useState(newContactsSlice(contactsInfo, 0, 5))

    function searchContact(contact, s) {
        //this function gets a string and a contact and returns if the contact title contain this string(nickname or firstName+lastName)
        const str = s.toLowerCase()
        if (contact.nickname) {
            return contact.nickname.toLowerCase().includes(str)
        }
        return (`${contact.firstName} ${contact.lastName}`).toLowerCase().includes(str)
    }

    const searchContacts = (e) => {
        //this function gets a string and show all the contacts the contain this string
        const filteredContacts = contactsInfo.filter((contact) => searchContact(contact, e.target.value))
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
            setContacts([...newContactsSlice(contactsInfo, 0, con)])
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    })

    return (
        <Container >
            <Row>
                <NavBar search={searchContacts}></NavBar>
            </Row>
            <Row>
                <ListGroup as="ul">
                    {contacts.map((contact, index) => <ListGroup.Item key={index} action variant="light" ><Contact contact={contact} /></ListGroup.Item>)}
                </ListGroup>
            </Row>
        </Container>

    )
}
