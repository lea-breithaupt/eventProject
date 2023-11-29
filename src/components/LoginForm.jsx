import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector((state) => state.userId)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await axios.post('/login', { username, password })
            .then(res => {
                dispatch({
                    type: 'authenticated',
                    payload: res.data.userId
                })
                console.log('User logged in')
                navigate(`/user-main-page/${res.data.userId}`)
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.message)
            })
    } 

  return (
    <div>
        <form id='loginForm' onSubmit={handleSubmit}>
            <h3>Username:</h3>
            <input 
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
            />
            <h3>Password:</h3>
            <input 
                placeholder='Password'
                type={showPassword ? 'text': 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
            />
            <label>Show Password</label>
            <input 
                type='checkbox'
                checked={showPassword}
                onChange={togglePasswordVisibility}
            />
            <button type='sumbit'>Login</button>
        </form>       
    </div>
  )
}

export default Login