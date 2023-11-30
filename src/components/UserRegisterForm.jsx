import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { InputGroup, FormControl } from 'react-bootstrap'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

const UserRegisterForm = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [zipcode, setZipcode] = useState('')

    const [showForm, setShowForm] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const createNewUser = async (e) => {
        e.preventDefault()

        const registerNewUser = await axios.post('/register', { 
            username, 
            email, 
            password, 
            confirmPassword, 
            firstName, 
            lastName, 
            zipcode
        })
            .then(res => {
                dispatch({
                    type: 'createUser'
                })

                setShowForm(false)
            })
    }
  return (
    <div>
        {showForm && (
            <div className='Auth-form-container'>
            <form className='Auth-form' onSubmit={createNewUser}>
                <div className='Auth-form-content'>
                <h3 className='Auth-form-title'>Sign Up</h3>
                <div className='text-center'>
                    Already registered? {" "}
                    <NavLink to='/login' className='link-primary'>
                        Sign In
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
                <label>Email:</label>
                    <input
                        className='form-control mt-1'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className='form-group mt-3'>
                <label>Confirm password:</label>
                    <input
                        className='form-control mt-1'
                        placeholder='Confirm password'
                        type={showPassword ? 'text': 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='form-group mt-3'>
                <label>First Name:</label>
                    <input
                        className='form-control mt-1'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='form-group mt-3'>
                <label>Last Name:</label>
                    <input
                        className='form-control mt-1'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='form-group mt-3'>
                <label>Zipcode:</label>
                    <input
                        className='form-control mt-1'
                        placeholder='Zip Code'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='d-grid gap-2 mt-3'>
                <button type='submit' className='btn btn-primary'>Create Account</button>
                </div>
            </div>
            </form>
        </div>
        )}
        {!showForm && (
            <div>
                <p>Account Created!</p>
                <p>Please login!</p>
                <Link to='/login'>
                    <button className='btn btn-primary'>
                        Login
                    </button>
                </Link>
            </div>
        )}
    </div>
  )
}

export default UserRegisterForm
