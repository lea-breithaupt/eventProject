import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { InputGroup, FormControl } from 'react-bootstrap'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

const UserProfile = () => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.userId)
    const editMode = useSelector((state) => state.editMode)

    const [user, setUser] = useState(null)
    const [editUser, setEditUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        zipcode: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleDelete = async () => {
        await axios.delete('/deleteUserProfile')
    }

    const handleEdit = () => {
        dispatch({
            type: 'EDIT_MODE',
            payload: !editMode,
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSave = async () => {
        await axios.put(`/updateUserProfile/${userId}`, editUser)
        dispatch({
            type: 'EDIT_MODE'
        })

        const response = await axios.get(`/getUserProfile/${userId}`)
        setUser(response.data)
        setEditUser(response.data)
    }

    useEffect(() => {
        const getUserProfile = async () => {
            const response = await axios.get(`/getUserProfile/${userId}`)
            setUser(response.data)
            setEditUser(response.data)

            dispatch({
                type: 'EDIT_MODE',
                payload: false
            })
        }
        
        getUserProfile()
    }, [userId])

    return (
        <div>
            <div>
                {editUser && editMode && (
                    <div className='User-profile-form-container'>
                        <div className='User-profile-form'>
                         <div className='User-profile-content'>
                            <div className='form-group mt-3'>       
                             <label>First Name:</label>
                                <input 
                                 value={editUser.firstName} 
                                 onChange={(e) => setEditUser({ 
                                    ...editUser, 
                                    firstName: e.target.value 
                                 })} 
                                /> 
                            </div>

                            <div className='form-group mt-3'>
                             <label>Last Name:</label>
                                <input 
                                 value={editUser.lastName} 
                                 onChange={(e) => setEditUser({
                                    ...editUser, 
                                    lastName: e.target.value
                                 })} 
                                />
                            </div>

                            <div className='form-group mt-3'>
                             <label>Username:</label>
                                <input 
                                 value={editUser.username} 
                                 onChange={(e) => setEditUser({
                                    ...editUser, 
                                    username: e.target.value 
                                 })}
                                /> 
                            </div>

                            <div className='form-group mt-3'>
                             <label>Email:</label>
                                <input 
                                 value={editUser.email} 
                                 onChange={(e) => setEditUser({
                                    ...editUser, 
                                    email: e.target.value 
                                 })}
                                />
                            </div>

                            <div className='form-group mt-3'> 
                             <label>Password:</label>
                                <InputGroup>
                                 <FormControl
                                    type={showPassword ? 'text' : 'password'}
                                    value={editUser.password}
                                    onChange={(e) => setEditUser({ 
                                        ...editUser, 
                                        password: e.target.value 
                                    })}
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
                             <label>Zipcode:</label> 
                                <input 
                                    value={editUser.zipcode} 
                                    onChange={(e) => setEditUser({
                                        ...editUser, 
                                        zipcode: e.target.value 
                                    })}
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button 
                                 className='Btn' 
                                 onClick={handleEdit}>
                                    Cancel
                                </button>

                                <button 
                                 className='Btn' 
                                 onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                         </div>
                        </div>
                    </div>
                )} 

                {editUser && !editMode && (
                    <div>
                     <div className='User-profile-container'>
                        <div className='User-profile-content-box'>
                            <div className='User-profile-content'>
                             <h3 className='Auth-form-title'>Personal Information:</h3>
                                <label>First Name:</label>
                                    <p>{editUser.firstName}</p>
                                <label>Last Name:</label>
                                    <p>{editUser.lastName}</p>
                                <label>Username: </label>
                                    <p>{editUser.username}</p>
                                <label>Email: </label>
                                    <p>{editUser.email}</p>
                                <label>Password:</label> 
                                    <p>{' '}
                                     {showPassword ? editUser.password : '•'.repeat(editUser.password.length)}
                                    </p>
                                <label>Zipcode:</label>
                                    <p>{editUser.zipcode}</p>

                                <button 
                                    className='Btn' 
                                    onClick={handleEdit}>
                                        Edit
                                </button>
                            </div>
                        </div>
                     </div>

                        <div className='Delete-account-btn-container'>
                            <button 
                                className='Delete-btn' 
                                onClick={handleDelete}>
                                    Delete Account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfile