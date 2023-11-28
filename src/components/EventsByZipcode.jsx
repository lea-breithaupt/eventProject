import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserEventsByZipcode = () => {
  const [userEvents, setUserEvents] = useState([]);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const fetchUserEventsByZipcode = async () => {
      try {
        const response = await axios.get('/getEventsByUserZipcode');
        setUserEvents(response.data);
      } catch (error) {
        console.error('Error fetching user events by zipcode:', error);
      }
    };

    if (userId) {
      fetchUserEventsByZipcode();
    }
  }, [userId]);

  return (
    <div>
      <h2>User Events By Zipcode</h2>
      <div>
        {userEvents.map((event) => (
          <div key={event.eventId}>
            <p>{event.eventName}</p>
            <p>{event.venueName}</p>
            <p>{event.eventDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEventsByZipcode;