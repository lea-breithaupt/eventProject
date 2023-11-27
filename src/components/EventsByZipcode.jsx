import axios from 'axios'
import { useState, useEffect } from 'react'

const EventsByZipcode = ({ eventsByZipcode, setEventsByZipcode }) => {
    // const handleFavorite = async (eventId) => {
    //   try {
    //     // Call the addToFavorites function passed from the parent component
    //     await addToFavorites(eventId);
    //   } catch (error) {
    //     console.error('Error favoriting event:', error);
    //   }
    // };
//   const [eventsByZipcode, setEventsByZipcode] = useState([])

//   const handleFavorite = async (eventId) => {
//     await axios.post(`/favoriteEvent/${eventId}`)
//   }

  useEffect(() => {
    const fetchEventsByZipcode = async () => {
        const response = await axios.get('/getEventsByUserZipcode')

        setEventsByZipcode(response.data)
    }

    fetchEventsByZipcode()
  }, [])

  return (
    <div>
      <div>
        {eventsByZipcode.map((event) => (
          <div key={event.eventId}>
            <p>{event.eventName}</p>
            <p>{event.venueName}</p>
            <p>{event.eventDate}</p>
            <button>Favorite</button>
            <button>Attend</button>
        </div>
        ))}
      </div>
    </div>
  )
}

export default EventsByZipcode