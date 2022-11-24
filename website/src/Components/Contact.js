import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ContactForm from "./ContactForm";


export default function Contact(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const contact = { ...props.contact }
    const photo = contact?.photo || "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"

    return (

        <Container>
            <Row className="py-4" onClick={handleShow}>
                <Col xs={4} lg={3} className='d-flex'>
                    <img src={photo} className={` img_cov border border-2 shadow rounded w-100 ${contact?.photoStyle} `}></img>
                </Col>
                <Col className="px-5 py-1" xs={8}><h4 className='text-truncate fw-bold '>{contact?.title}</h4></Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {contact?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm
                        close={handleClose}
                        viewOnly={true}
                        id={contact?.id}
                        photo={photo}
                        firstName={contact?.firstName}
                        lastName={contact?.lastName}
                        nickname={contact?.nickname}
                        title={contact?.title}
                        address={contact?.address}
                        photoStyle={contact?.photoStyle}
                        phoneNumbers={contact?.phoneNumbers}
                    ></ContactForm>
                </Modal.Body>
            </Modal>
        </Container>
    )
}