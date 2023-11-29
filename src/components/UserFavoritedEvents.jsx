import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const UserFavoritedEvents = () => {
  const userId = useSelector((state) => state.userId)
  const [favoritedEvents, setFavoritedEvents] = useState([]);

  useEffect(() => {
    const getUserFavoritedEvents = async () => {
      try {
        const response = await axios.get('/getUserFavoritedEvents', {
          params: { userId }, // Sending userId as a query parameter or adjust based on your server's requirement
        });
        setFavoritedEvents(response.data);
      } catch (error) {
        console.error('Error fetching favorited events:', error);
      }
    };

    getUserFavoritedEvents();
  }, [userId]);


  return (
    <div>
      {favoritedEvents.map((event) => (
        <div key={event.eventId}>
          <p>{event.eventName}</p>
          <p>{event.venueName}</p>
          <p>{event.eventDate}</p>
        </div>
      ))}
    </div>
  );
};

export default UserFavoritedEvents;