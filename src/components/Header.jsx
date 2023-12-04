import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userId)
  const loggedIn = useSelector((state) => state.isLoggedIn)

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
  
  const handleLogout = async () => {
      await axios.get('/logout')
      dispatch({
        type: 'logout',
      })
      console.log('User logged out')
  }

  return (
    <div>
      {loggedIn ? (
        <Navbar 
          expand="lg" 
          color="light" 
          className="custom-header" 
          style={{ height: 100 }}
        >
          <Container fluid>
            <Navbar.Brand 
              as={NavLink} 
              to={`/user-main-page/${userId}`} 
              className="me-auto d-flex align-items-center"
            >
              <img
                alt=""
                src="https://drive.google.com/uc?export=view&id=1BF2uE2ou-lWJOT9UlufgebamwQ7wNjnY"
                className="d-inline-block rounded-circle me-2" 
                style={{ width: 60 }}
              />
              CITY LIMITS
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <NavLink 
                to={`/user-profile/${userId}`} 
                className="me-2"
              >
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
        <Navbar 
          expand="lg" 
          color="light" 
          fixed="top" 
          className="custom-header"
        >
          <Container fluid>
            <Row className="align-items-start">
            <Col className="d-flex align-items-center">
              <Navbar.Brand 
                as={NavLink} 
                to={`/`} 
                className="me-auto d-flex align-items-center"
              >
                <img
                  alt=""
                  src="https://drive.google.com/uc?export=view&id=1BF2uE2ou-lWJOT9UlufgebamwQ7wNjnY"
                  className="d-inline-block rounded-circle me-2" 
                  style={{ width: 60 }}
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