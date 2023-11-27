import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const UserProfile = () => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.userId)
    const editMode = useSelector((state) => state.editMode)

    const [user, setUser] = useState(null)
    const [editUser, setEditUser] = useState(null)

    const handleDelete = async () => {
        await axios.delete('/deleteUserProfile')
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await axios.get(`/userProfile/${userId}`)
            setUser(response.data)
            setEditUser(response.data)
        }
        
        fetchUserProfile()
    }, [userId])

    const handleEdit = () => {
        dispatch({
            type: 'EDIT_MODE'
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    }

    const handleSave = async () => {
        await axios.put(`/updateUserProfile/${userId}`, editUser)
        dispatch({
            type: 'EDIT_MODE'
        })

        const response = await axios.get(`/userProfile/${userId}`);
        setUser(response.data);
        setEditUser(response.data);
    }

    return (
        <div>
            <div>
                <h4>Personal Information:</h4>
                {editUser && (
                    <div>
                        <p>First Name: {editMode ? <input name="firstName" value={editUser.firstName} onChange={handleInputChange} /> : editUser.firstName}</p>
                        <p>Last Name: {editMode ? <input name="lastName" value={editUser.lastName} onChange={handleInputChange} /> : editUser.lastName}</p>
                        <button onClick={handleEdit}>{editMode ? 'Cancel' : 'Edit'}</button>
                        {editMode && <button onClick={handleSave}>Save</button>}
                        <button onClick={handleDelete}>Delete Account</button>
                    </div>
                )}
            </div>
        <div>
            <h4>Created Events:</h4>
        </div>
        <div>
            <h4>Upcoming Events:</h4>
        </div>
        <div>
            <h4>Favorite Events:</h4>
        </div>
        </div>
    )
}

export default UserProfile

{/* <p>Password: {showPassword ? user.password : '•'.repeat(user.password.length)}</p>
                <button onClick={togglePasswordVisibility}>Toggle Password Visibility</button> */}
                {/* <button onClick={handleEdit}>Edit</button>
                {isEditing && <button onClick={handleSave}>Save</button>} */}

                // const [showPassword, setShowPassword] = useState(false)

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // }