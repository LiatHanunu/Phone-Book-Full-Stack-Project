
import './App.css';
import PhoneBookMainPage from './pages/PhoneBookMainPage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery} from "@apollo/client";
import { GET_CONTACTS } from './General/graphQlRequests';
import { sortContacts } from './General/generalFunctions'


function App() {
  const { data, loading, error } = useQuery(GET_CONTACTS);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  const contacts = sortContacts([...data.findAllContacts])
  localStorage.setItem("contacts", JSON.stringify(contacts))
  //this saves the contacts that were sent by the server in the local storage
  return (
    <>
        <Container className='mt-5'>
          <Row className='d-flex flex-column align-items-center'>
            <Col lg={6} xs={12}>
              <PhoneBookMainPage></PhoneBookMainPage>
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default App;
