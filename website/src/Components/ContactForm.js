import TextInput from "./TextInput"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import validate from "../General/validations";
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { MdAddCall } from "react-icons/md";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMutation } from "@apollo/client";
import { FiDelete, FiTrash2 } from "react-icons/fi";
import { useLazyQuery } from '@apollo/client';
import { ADD_CONTACT, DELETE_CONTACT, GET_URL, UPDATE_CONTACT } from "../General/graphQlRequests";


export default function ContactForm(props) {
    //this componnent is the contact form.
    //in this form we can create a new contact(and send it to the server),  we can watch an exsisting contact details,
    //update an exsisting contact details and delete a contact
    const [file, setFile] = useState("")
    const [newContact, newcontact] = useMutation(ADD_CONTACT)
    const [editContact, editcontact] = useMutation(UPDATE_CONTACT)
    const [deleteContact, deletecontact] = useMutation(DELETE_CONTACT)
    const [viewOnlyForm, setViewOnlyForm] = useState(props.viewOnly)
    const [getUploadS3Url, cloupload3url] = useLazyQuery(GET_URL);

    const filters = [
        { name: 'Grey Scale', class: 'greySacleStyle' },
        { name: 'Blur', class: 'blurStyle' },
        { name: 'Saturation', class: 'saturationStyle' },
        { name: 'None', class: '' }
    ]

    const [user, setUser] = useState({
        firstName:
        {
            name: "First Name",
            value: props.firstName || "",
            errors: [],
            validations: {
                required: true,
                minLength: 2,
                maxLength: 15
            }
        },
        lastName:
        {
            name: "Last Name",
            value: props.lastName || "",
            errors: [],
            validations: {
                required: true,
                minLength: 2,
                maxLength: 15
            }
        },
        nickname: {
            name: "nickname",
            value: props.nickname || "",
            errors: [],
            validations: {
            }
        },
        address: {
            name: "address",
            value: props.address || "",
            errors: [],
            validations: {
            }
        },
        phoneNumbers: {
            name: "phoneNumbers",
            value: props.phoneNumbers || [],
            errors: [],
            validations: {
                required: true
            }
        },
        photo: {
            name: "photo",
            value: props.photo || "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg",
            errors: [],
            validations: {

            }
        },
        photoStyle: {
            name: "photoStyle",
            value: props.photoStyle || "",
            errors: [],
            validations: {

            }
        }

    })

    async function uploadImage() {
        //this function gets secured url from our server to upload images to aws-3s bucket.
        // after te image is uploaded, the function returns the image url for the photo that was uploaded.
        //later on this url will be saved on the server for this contact (on handelSubmit function)
        if (file) {
            //checks if thee user uploaded a file
            const url = await getUploadS3Url()
            await fetch(url.data?.getUploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file
            })
            const imageUrl = url.data?.getUploadUrl.split('?')[0]
            return imageUrl
        }
        return props.photo || "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
        //props.photo is the photo that the contact already had.
        //if the user didn't have a photo, it sends a url for a public image.
    }

    async function handleSubmit(event) {
        //this function submit the contact form.
        //this function either creates a new user or updates one.
        event.preventDefault();
        let canValidate = true
        for (const input in user) {
            //this loop validate each user input and makes sure that everything is valid(based on our configuration)
            const currInput = user[input]
            currInput.errors = validate(currInput.name, currInput.value, currInput.validations)
            if (currInput.errors.length !== 0) {
                canValidate = false
            }
        }
        if (canValidate) {
            const img = await uploadImage()
            const input = {
                id: props.id,
                firstName: user.firstName.value,
                lastName: user.lastName.value,
                nickname: user.nickname.value,
                address: user.address.value,
                photo: img,
                photoStyle: user.photoStyle.value,
                phoneNumbers: user.phoneNumbers.value
            }
            if (props.id) {
                //if an id was sent, we know that this form now present an exiting contact.
                //a mutitaion that edits an existing contact
                await editContact({ variables: { updateProjectInput: input } })
            } else {
                //a mutitaion that creates a new contact
                await newContact(
                    { variables: { createContactInput: input } }
                )
            }
            window.location.reload()
        }
    };
    const saveImageUrlAndPreviewImage = (e) => {
        //this functionsaves the file that was uploaded (so that we can use it later), and creates a temp url for the image
        //so that we can preview this image for the user.
        setFile(e.target.files[0])
        const photo = URL.createObjectURL(e.target.files[0])
        user.photo.value = photo
        setUser({ ...user })
    }

    const newPhoneNumber = () => {
        //this function adds a new phone input line
        user.phoneNumbers.value.push("")
        setUser({ ...user })
    }

    const handelChange = ({ target: { name, value } }) => {
        //this function updates the user input in our user state.
        user[name].value = value
        user[name].errors = validate(user[name].name, value, user[name].validations)
        console.log(user)
        setUser({ ...user })
    }

    const addPhoneNumber = (index, e) => {
        //this function adds the phone number input to the user state.
        user.phoneNumbers.value[index] = e.target.value
        setUser({ ...user })

    }

    const deletePhoneNumber = (index) => {
        //this function deletes a specific phone number from the phone number array.
        user.phoneNumbers.value.splice(index, 1)
        setUser({ ...user })

    }

    const changePhotoStyle = (value) => {
        //this function changes the filters for the contact image
        user.photoStyle.value = value
        setUser({ ...user })
    }

    return (
        <>
            <Col lg={12} xs={12}>
                <Form className='rounded border p-3 m-2 bg-light'>
                    <Row className="d-flex justify-content-center mb-2 p-0">
                        <Col className="overlay_box p-0">
                            <img src={user.photo.value}
                                className={`img_cov border border-2 shadow rounded  ${user.photoStyle.value}`} alt="example placeholder" />
                            {!viewOnlyForm && <div class="overlay rounded">
                                <label for="browse" className="text ">Upload Image</label>
                            </div>}

                        </Col>
                    </Row>
                    {!viewOnlyForm && <Row className="d-flex">
                        <ToggleButtonGroup className='my-2 p-1' type="radio" name="photoStyle" >
                            {filters.map((filter, index) => <ToggleButton key={index} variant="outline-secondary" name="photoStyle" active={filter.class == user.photoStyle.value} id={filter.name} value={filter.class} onClick={() => changePhotoStyle(filter.class)}>{filter.name}
                            </ToggleButton>)}
                        </ToggleButtonGroup>
                        <Form.Group className="mb-3 ">
                            <Form.Control id="browse" className="" name='photo' onChange={saveImageUrlAndPreviewImage} type="file" accept="image/*" style={{ display: 'none' }} />

                        </Form.Group>
                        <hr />
                    </Row>}
                    <Row>
                        <TextInput
                            disabled={viewOnlyForm}
                            handelChange={handelChange}
                            validate={user.firstName.errors.length == 0}
                            label={"First Name"}
                            type={"text"}
                            name={"firstName"}
                            error={user.firstName.errors}
                            placeholder="Add First Name"
                            value={user.firstName.value}
                            sizeXS={""}
                            sizeLG={""}>
                        </TextInput>

                        <TextInput
                            disabled={viewOnlyForm}
                            handelChange={handelChange}
                            validate={user.lastName.errors.length == 0}
                            label={"Last Name"}
                            type={"text"}
                            name={"lastName"}
                            error={user.lastName.errors}
                            placeholder="Add Last Name"
                            value={user.lastName.value}
                            sizeXS={""}
                            sizeLG={""}>
                        </TextInput>
                    </Row>
                    <Row>
                        <Col>
                            <TextInput
                                disabled={viewOnlyForm}
                                handelChange={handelChange}
                                validate={user.nickname.errors.length == 0}
                                label={"Nickname"}
                                type={"text"}
                                name={"nickname"}
                                error={user.nickname.errors}
                                placeholder="Add Nickname"
                                value={user.nickname.value}
                                sizeXS={""}
                                sizeLG={""}>
                            </TextInput>

                        </Col>
                        <Col>
                            <TextInput
                                disabled={viewOnlyForm}
                                handelChange={handelChange}
                                validate={user.address.errors.length == 0}
                                label={"Address"}
                                type={"text"}
                                name={"address"}
                                error={user.address.errors}
                                placeholder="Add Address"
                                value={user.address.value}
                                sizeXS={""}
                                sizeLG={""}>
                            </TextInput>

                        </Col>
                    </Row>
                    {user.phoneNumbers?.value.map((phone, index) => <Row key={index} className='my-3'>
                        <Col>
                            <PhoneInput
                                disabled={viewOnlyForm}
                                country="il"
                                name={index}
                                onlyCountries={['il']}
                                value={phone}
                                copyNumbersOnly={true}
                                onBlur={(e) => addPhoneNumber(index, e)}
                            />
                        </Col>
                        <Col>
                            <Button disabled={viewOnlyForm} variant="" className="my_btn shadow-sm rounded-circle" onClick={() => { deletePhoneNumber(index) }} ><FiDelete></FiDelete></Button>
                        </Col>
                    </Row>)}

                    <Row>
                        <Col xs={12} className='d-grid my-3'>

                            <Button variant="" className="my_btn shadow-sm" onClick={newPhoneNumber} disabled={viewOnlyForm}>
                                <MdAddCall className="me-3"></MdAddCall>
                                {/* <Badge className="rounded-circle mx-2">+</Badge> */}
                                Add phone number
                            </Button>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Form.Group className='d-flex flex-row-reverse'>
                        {!viewOnlyForm &&
                            <Button variant="" className="my_btn shadow-sm" type="submit" onClick={handleSubmit}>
                                Save Details
                            </Button>}
                        {viewOnlyForm && <Row>
                            <Col>
                                <Button variant="" className="my_btn shadow-sm px-5" type="submit" onClick={() => { setViewOnlyForm(false) }}>
                                    Edit
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="" className="my_btn shadow-sm px-4" type="submit" onClick={() => { deleteContact({ variables: { id: props.id } }) }}>
                                    <FiTrash2></FiTrash2>
                                </Button>
                            </Col>
                        </Row>
                        }

                    </Form.Group>
                </Form>
            </Col>
        </>

    )
}