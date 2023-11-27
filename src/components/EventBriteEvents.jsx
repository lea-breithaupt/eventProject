import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventbriteEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const API_KEY = 'ZKJRCN7ZOKV36BGCXOZE';
        const response = await axios.get('https://www.eventbriteapi.com/v3/users/me/?token=ZKJRCN7ZOKV36BGCXOZE');
        setEvents(response.data.events); // Assuming events are in response.data.events
      } catch (error) {
        console.error('Error fetching events from Eventbrite:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events from Eventbrite</h1>
      <div>
        {/* {events.map((event) => (
          <div key={event.id}>
            <h2>{event.name.text}</h2>
            <p>Date: {event.start.local}</p>
            <p>Venue: {event.venue ? event.venue.name : 'Venue details not available'}</p> */}
            {/* Add other event details as needed */}
          {/* </div>
        ))} */}
      </div>
    </div>
  );
};

export default EventbriteEvents;