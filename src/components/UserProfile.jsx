import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar } from '@fullcalendar/core';

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
            <div>
                <h2>{firstName}</h2>
            </div>
            <div>
                <h4>Personal Information:</h4>
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
            <div>
                <h4>My Calendar:</h4>
                <Calendar />
            </div>
        </div>
    );
};

export default UserProfile;