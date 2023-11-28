import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

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

  const handleLogout = async () => {
      await axios.get('/logout')
      dispatch({
        type: 'logout',
      })
      console.log('User logged out')
  }

  useEffect(() => {
    sessionCheck()
  }, [])

  return (
    <div>
      {loggedIn ? (
       <Navbar bg="dark" data-bs-theme="dark" fixed="top">
          <Container className="justify-content-end">
            <Nav>
              <NavLink to='/'>
                <Button variant="light">
                  Home
                </Button>
              </NavLink>
              <NavLink to={`/user-profile/${userId}`}>
                <Button variant="light">
                  Profile
                </Button>
              </NavLink>
              <NavLink to='/login'>
                <Button variant="light" onClick={handleLogout}>
                  Logout
                </Button>
              </NavLink>
            </Nav>
          </Container>
         </Navbar>
      ):(
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <p>CITY LIMITS!</p>
          <NavLink to='/'>
            <Button variant="light">
              Home
            </Button>
          </NavLink>
          <NavLink to='/login'>
            <Button variant="light">
              Login
            </Button>
          </NavLink>
          <NavLink to="/create-user-account">
            <Button variant="light">
              Sign Up
            </Button>
          </NavLink>
        </Container>
       </Navbar>
      )}
    </div>
  )
}

export default Header