import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EventbriteEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEventBriteEvents = async () => {
        const API_KEY = 'ZKJRCN7ZOKV36BGCXOZE'
        const response = await axios.get('https://www.eventbriteapi.com/v3/users/me/?token=ZKJRCN7ZOKV36BGCXOZE')
        setEvents(response.data.events)
    }

    getEventBriteEvents()
  }, [])

  return (
    <div>
      <h1>Events from Eventbrite</h1>
    </div>
  )
}

export default EventbriteEvents