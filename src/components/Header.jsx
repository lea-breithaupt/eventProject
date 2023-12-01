import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userId)
  const loggedIn = useSelector((state) => state.isLoggedIn)
  const userZipcode = useSelector((state) => state.userZipcode)

  const [editZipcodeMode, setEditZipcodeMode] = useState(false)
  const [newZipcode, setNewZipcode] = useState('')

  const sessionCheck = async () => {
    await axios.get('/sessionCheck')
      .then(res => {
        if(res.data.userId){
          dispatch({
            type: 'authenticated',
            payload: res.data.userId.userId
          })
        } else {
          console.log(res.data)
        }
      })
  }

  useEffect(() => {
    sessionCheck()
  }, [])

    const getUserZipcode = async () => {
        const response = await axios.get(`/getUserProfile/${userId}`)
        dispatch({
          type: 'UPDATE_USER_ZIPCODE',
          payload: response.data.zipcode
        })
    }

  useEffect(() => {
    if (userId) {
      getUserZipcode();
    }
  }, [userId]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (editZipcodeMode) {
  //     await axios.put(`/updateUserZipcode/${userId}`, { zipcode: newZipcode });
  //     dispatch({
  //       type: 'UPDATE_USER_ZIPCODE',
  //       payload: newZipcode
  //     });
  //     setEditZipcodeMode(false);
  //   } else {
  //     setEditZipcodeMode(true);
  //   }
  // };
  
  const handleEditZipcode = () => {
    setEditZipcodeMode(true)
  } 

  const handleLogout = async () => {
      await axios.get('/logout')
      dispatch({
        type: 'logout',
      })
      console.log('User logged out')
  }
  {`/user-main-page/${userId}`}
  return (
    <div>
      {loggedIn ? (
    <Navbar expand="lg" color="light" className="custom-header" style={{ height: 100 }}>
    <Container fluid>
      <Navbar.Brand as={NavLink} to={`/user-main-page/${userId}`} className="me-auto d-flex align-items-center">
        <img
          alt=""
          src="https://drive.google.com/uc?export=view&id=1BF2uE2ou-lWJOT9UlufgebamwQ7wNjnY"
          className="d-inline-block rounded-circle me-2" style={{ width: 60 }}
        />
        CITY LIMITS
      </Navbar.Brand>
      <Nav className="justify-content-end">
        <NavLink to={`/user-profile/${userId}`} className="me-2">
          <button className="Btn">
            Profile
          </button>
        </NavLink>
        <NavLink to='/'>
          <button className="Btn" onClick={handleLogout}>
            Logout
          </button>
        </NavLink>
      </Nav>
    </Container>
  </Navbar>
      ):(
<Navbar expand="lg" color="light" fixed="top" className="custom-header">
  <Container fluid>
    <Row className="align-items-start">
      <Col className="d-flex align-items-center">
      <Navbar.Brand as={NavLink} to={`/`} className="me-auto d-flex align-items-center">
        <img
          alt=""
          src="https://drive.google.com/uc?export=view&id=1BF2uE2ou-lWJOT9UlufgebamwQ7wNjnY"
          className="d-inline-block rounded-circle me-2" style={{ width: 60 }}
        />
        CITY LIMITS
      </Navbar.Brand>
      </Col>
    </Row>
  </Container>
</Navbar>
      )}
    </div>
  )
}

export default Header