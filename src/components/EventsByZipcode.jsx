import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserEventsByZipcode = () => {
  const [userEvents, setUserEvents] = useState([]);
  const userId = useSelector((state) => state.userId);

  const handleFavoriteEvent = async (eventId) => {
    try {
      await axios.post(`/favoriteEvent/${eventId}`, userId);
      const updatedEvents = userEvents.filter((event) => event.eventId !== eventId);
      setUserEvents(updatedEvents);
    } catch (error) {
      console.error('Error favoriting event:', error);
    }
  };

  useEffect(() => {
    const getUserEventsByZipcode = async () => {
      try {
        const response = await axios.get('/getEventsByUserZipcode');
        setUserEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (userId) {
      getUserEventsByZipcode();
    }
  }, [userId]);

  return (
    <div>
      <div>
        {userEvents.map((event) => (
          <div key={event.eventId}>
            <p>{event.eventName}</p>
            <p>{event.venueName}</p>
            <p>{event.eventDate}</p>
            <button onClick={() => handleFavoriteEvent(event.eventId)}>Favorite</button>
            <button>Attend</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEventsByZipcode;