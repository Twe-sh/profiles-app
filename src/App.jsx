import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import { useState } from 'react'

export default function App() {
  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  function onLikeClicked(id) {
    setPeople(ps => ps.map(p => p.id===id? { ...p, likes: p.likes+1 } : p))
  }

  function onFormUpdate(event) {
    setName(event.target.value)
  }

  function getNewId() {
    let idFound = false
    let id = 1
    while (!idFound) {
      const exists = people.some(p => p.id===id);
      if (exists) {
        id++
        continue
      } else {
        return id
      }
    }
  }

  function onFormSubmit(event) {
    event.preventDefault() // stop page from refreshing
    const trimmed = name.trim()
    if (trimmed == '') {
      setNameError('Name cannot be empty')
      return
    }

    const exists = people.some(p => p.name.toLowerCase()===trimmed.toLowerCase());
    if (exists) {
      setNameError('The name already exists')
      return
    }

    setPeople([...people ,{id: getNewId(), name: trimmed, likes: 0}])
    setNameError('')
  }

  

  return (
    <Container className="py-4 container-fluid">
      <h1 className="mb-4 text-center">Profiles</h1>
      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} id={p.id} onLikeClicked={onLikeClicked}/>
          </Col>
        ))}
      </Row>

      <Row>
        <form>
          <label htmlFor='cardNameInput'>Name:</label>
          <input className={`form-control ${nameError ? 'is-invalid' : ''}`} name='cardNameInput' placeholder='Enter Name' value={name} onChange={onFormUpdate}/>
          <p className='invalid-feedback'>{nameError}</p>
          <button className='mt-2' onClick={onFormSubmit}>Add</button>
        </form>
      </Row>
    </Container>
  );
}