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
       <div>
          <NavLink to='/'>
            <button>
              Home
            </button>
          </NavLink>
          <NavLink to='/user-profile/:userId'>
            <button>
              Profile
            </button>
          </NavLink>
          <NavLink to='/login'>
              <button onClick={handleLogout}>
                Logout
              </button>
          </NavLink>
         </div>
      ):(
      <div>
        <p>CITY LIMITS!</p>
        <NavLink to='/login'>
          <button>Login</button>
        </NavLink>
        <NavLink to="/create-user-account">
          <button>Sign Up</button>
        </NavLink>
        
       </div>
      )}
    </div>
  )
}

export default Header