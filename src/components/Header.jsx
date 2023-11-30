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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editZipcodeMode) {
      await axios.put(`/updateUserZipcode/${userId}`, { zipcode: newZipcode });
      dispatch({
        type: 'UPDATE_USER_ZIPCODE',
        payload: newZipcode
      });
      setEditZipcodeMode(false);
    } else {
      setEditZipcodeMode(true);
    }
  };
  
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
       <Navbar>
          <Container>
            <Nav>
              <NavLink to={`/user-main-page/${userId}`}>
                <button>
                  Home
                </button>
              </NavLink>
              <p>{userZipcode}</p>
              <form onSubmit={handleSubmit}>
                {editZipcodeMode ? (
                  <div>
                    <input
                      type="text"
                      className="text-white"
                      placeholder='Search by Zipcode...'
                      value={newZipcode}
                      onChange={(e) => setNewZipcode(e.target.value)}
                    />
                    <button type="submit">
                      Set Location
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setEditZipcodeMode(true)}>
                    Change Location
                  </button>
                )}
              </form>
              <NavLink to={`/user-profile/${userId}`}>
                <button>
                  Profile
                </button>
              </NavLink>
              <NavLink to='/'>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </NavLink>
            </Nav>
          </Container>
         </Navbar>
      ):(
<Navbar className="bg-body-tertiary">
<Container>
  <Navbar.Brand to='/'>
    <img
      alt=""
      src="https://www.canva.com/design/DAF1nTcvHs0/IBiXEHDbcN9Vu8IRBv9beQ/edit?utm_content=DAF1nTcvHs0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
      width="30"
      height="30"
      className="d-inline-block align-top"
    />{' '}
    CITY LIMITS
  </Navbar.Brand>
</Container>
</Navbar>
      )}
    </div>
  )
}

export default Header