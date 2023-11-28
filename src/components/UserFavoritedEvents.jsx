import axios from 'axios'
import { useState, useEffect } from 'react'

const UserFavoritedEvents = () => {
  const [favoritedEvents, setFavoritedEvents] = useState([])

  useEffect(() => {
    const getUserFavoritedEvents = async () => {
      const response = await axios.get('/getUserFavoritedEvents')
      setFavoritedEvents(response.data)
    }

    getUserFavoritedEvents()
  }, [])

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
  )
}

export default UserFavoritedEvents