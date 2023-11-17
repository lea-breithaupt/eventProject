import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserCreatedEvents = ({ eventList, setEventList }) => {
  // const [userEvents, setUserEvents] = useState([])

  // const [events, setEvents] = useState(eventDetails)
  // const [updatedEvents, setUpdatedEvents] = useState(eventDetails)

  // useEffect(() => {
  //   fetchEvents();
  // }, [setEventList]); // Update dependency to reload events after changes

  // const fetchEvents = async () => {
  //   try {
  //     const response = await axios.post(`/addUserEvent/${userId}`)
  //     setEventList(response.data);
  //   } catch (error) {
  //     console.error('Error fetching user events:', error);
  //   }
  // };

  const handleDeleteEvent = async (eventId) => {
      const response = await axios.delete(`/deleteEvent/${eventId}`)
      console.log(response.data)
      setEventList(eventList.filter(event => event.eventId !== eventId));
    }
  
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

export default UserCreatedEvents;

