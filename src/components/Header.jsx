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

  const handleChangeZipcode = async () => {
      await axios.put(`/updateUserZipcode/${userId}`, { zipcode: newZipcode })
      dispatch({
        type: 'UPDATE_USER_ZIPCODE',
        payload: newZipcode
      })
      setEditZipcodeMode(false)
  }
  
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

  return (
    <div>
      {loggedIn ? (
       <Navbar bg="dark" data-bs-theme="dark" fixed="top">
          <Container className="justify-content-end">
            <Nav>
              <NavLink to={`/user-main-page/${userId}`}>
                <Button variant="light">
                  Home
                </Button>
              </NavLink>
              <p>{userZipcode}</p>
                {editZipcodeMode ? (
                <div>
                  <input
                    type="text"
                    className="text-white" 
                    value={newZipcode}
                    onChange={(e) => setNewZipcode(e.target.value)}
                  />
                  <Button variant="light" onClick={handleChangeZipcode}>
                    Set Location
                  </Button>
                </div>
              ) : (
                <Button variant="light" onClick={handleEditZipcode}>
                  Change Location
                </Button>
              )}
              <NavLink to={`/user-profile/${userId}`}>
                <Button variant="light">
                  Profile
                </Button>
              </NavLink>
              <NavLink to='/'>
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
        </Container>
       </Navbar>
      )}
    </div>
  )
}

export default Header