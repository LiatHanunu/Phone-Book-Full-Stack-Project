import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ContactForm from './ContactForm';
import { AiOutlineUserAdd } from "react-icons/ai";


export default function NavBar(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <Navbar bg="dark" variant="dark" className='rounded-top sticky-top'>
            <Container fluid>
                <Navbar.Brand >Phone Book</Navbar.Brand>
                <Form className="d-flex">
                    <Form.Control
                        onInput={props.search}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button className='rounded my_btn shadow-sm' variant='' onClick={handleShow}>
                        <AiOutlineUserAdd className=''></AiOutlineUserAdd>
                    </Button>
                </Form>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ContactForm viewOnlyForm={false}></ContactForm>
                    </Modal.Body>
                </Modal>

            </Container>
        </Navbar>
    )
}