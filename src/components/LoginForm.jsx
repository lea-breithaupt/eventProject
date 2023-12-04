import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { InputGroup, FormControl } from 'react-bootstrap'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

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
    <div className='Login-form-container'>
        <form className='Auth-form' onSubmit={handleSubmit}>
            <div className='Auth-form-content'>
                <h3 className='Auth-form-title'>Sign In</h3>
                <div className='text-center'>
                    Not registered yet?{" "}
                    <NavLink 
                     to="/create-user-account" 
                     className='link-primary'
                    >Sign Up
                    </NavLink>
                </div>
                <div className='form-group mt-3'>
                    <label>Username:</label>
                    <input
                        className='form-control mt-1'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='form-group mt-3'>
                    <label>Password:</label>
                        <InputGroup>
                            <FormControl
                                className='form-control mt-1'
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                            <InputGroup.Text 
                                onClick={togglePasswordVisibility} 
                                style={{ cursor: 'pointer' }}
                            >
                            {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                            </InputGroup.Text>
                        </InputGroup>
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type='sumbit' className="btn btn-primary">
                        Login
                    </button>
                </div>
            </div>
        </form>       
    </div>
  )
}

export default Login