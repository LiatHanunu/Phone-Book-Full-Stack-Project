import gql from 'graphql-tag';

//this file contains the grphql quries and mutations we use for this project

const ADD_CONTACT = gql`mutation refactored241($createContactInput: ContactDto!) {
    createContact(createContactInput: $createContactInput) {
      id
      firstName
      lastName
      nickname
      title
      address
      photo
      photoStyle
      phoneNumbers
    }
  }
  
`;

const UPDATE_CONTACT = gql`
mutation refactored918($updateProjectInput: UpdateContactDto!) {
    updateProject(updateProjectInput: $updateProjectInput) {
      id
      firstName
      lastName
      nickname
      title
      address
      photo
      photoStyle
      phoneNumbers
    }
  }
`

const DELETE_CONTACT = gql`
mutation refactored317($id: Int!) {
    removeContact(id: $id)
  }
  
`


const GET_URL = gql`
query refactored943 {
    getUploadUrl
  }
  
`;


const GET_CONTACTS = gql`
query findAllContacts 
{
  findAllContacts {
    id
    firstName
    lastName
    nickname
    title
    address
    photo
    photoStyle
    phoneNumbers
  }
}
`;

export {GET_URL, DELETE_CONTACT,ADD_CONTACT,UPDATE_CONTACT, GET_CONTACTS}