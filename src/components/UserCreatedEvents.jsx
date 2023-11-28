import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserCreatedEvents = ({ eventList, setEventList }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userId)

  const handleDeleteEvent = async (eventId) => {
      const response = await axios.delete(`/deleteEvent/${eventId}`)
      console.log(response.data)
      setEventList(eventList.filter(event => event.eventId !== eventId))
    }

  
useEffect(() => {
  const getAllUserEvents = async () => {
    const response = await axios.get(`/getEventsCreatedByUser/${userId}`)
    setEventList(response.data)
  }
  getAllUserEvents()
}, [userId])

return (
  <div>
    <div>
      {eventList.map((event) => (
        <div key={event.eventId}>
          <p>{event.eventName}</p>
          <p>{event.venueName}</p>
          <p>{event.eventDate}</p>
          <button>Edit</button>
          <button onClick={() => handleDeleteEvent(event.eventId)}>Delete Event</button>
        </div>
      ))}
    </div>
  </div>
)
}

export default UserCreatedEvents