import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ContactForm from "./ContactForm";


export default function Contact(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const contact = {...props.contact }
    const photo = contact?.photo || "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
    
    return (

        <Container>
            <Row className="py-4" onClick={handleShow}>
                <Col xs={4} lg={3} className='d-flex'>
                    <img src={photo}  className={` cov border border-2 shadow rounded w-100 ${contact?.photoStyle} `}></img>
                </Col>
                {contact?.nickname && <Col className="px-5 py-1" xs={8}><h4 className='text-truncate fw-bold '>{contact?.nickname}</h4></Col>}
                {!contact?.nickname && <Col className="px-5 py-1" xs={8}><h4 className='text-truncate  fw-bold'>{contact?.firstName} {contact?.lastName}</h4></Col>}
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {contact.nickname && <h3>
                           { contact.nickname}

                        </h3>}
                        {!contact.nickname && <h3>
                            {contact?.firstName} {contact?.lastName}
 
                         </h3>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm
                        close={handleClose}
                        viewOnly={true}
                        id={contact?.id}
                        photo = {photo}
                        firstName={contact?.firstName}
                        lastName={contact?.lastName}
                        nickname = {contact?.nickname}
                        address = {contact?.address}
                        photoStyle = {contact?.photoStyle}
                        phoneNumbers = {contact?.phoneNumbers}
                    ></ContactForm>
                </Modal.Body>
            </Modal>
        </Container>
    )
}