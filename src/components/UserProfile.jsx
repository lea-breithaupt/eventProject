import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserFirstName = async () => {
                const response = await axios.get('/getUsersFirstName');
                const userFirstName = response.data.firstName;
                setFirstName(userFirstName)
        
        }

        fetchUserFirstName()
    }, [])

    return (
        <div>
            <h2>{firstName}</h2>
        </div>
    );
};

export default UserProfile;