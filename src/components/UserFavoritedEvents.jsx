import {useState, useEffect } from 'react'
import axios from 'axios'

const UserFavoritedEvents = () => {
  // const [favoritedEvents, setFavoritedEvents] = useState([]);

  // useEffect(() => {
  //   const fetchFavoriteEvents = async () => {
  //     try {
  //       const response = await axios.get('/userFavoriteEvents');
  //       setFavoritedEvents(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user favorite events:', error);
  //       // Handle error
  //     }
  //   };

  //   fetchFavoriteEvents();
  // }, [])

  // const addFavoritedEvent = (newFavoritedEvent) => {
  //   setFavoritedEvents([...favoritedEvents, newFavoritedEvent])
  // }

  return (
       <div>
      {/* <div>
        {favoritedEvents.map((event) => (
          <div key={event.eventId}>
            <p>{event.eventName}</p>
            <p>{event.venueName}</p> */}
            {/* Add other event details */}
            {/* Include a delete button to remove the event from favorites */}
            {/* <button>Delete</button>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default UserFavoritedEvents