import axios from 'axios'
import { set } from 'lodash'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Col, Row } from 'react-bootstrap';

const UserCreatedEvents = ({ eventList, setEventList }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userId)
  const editModeEventId = useSelector((state) => state.eventId)

  const [editEvent, setEditEvent] = useState({
    eventName: '',
    eventImgPath: '',
    venueName: '',
    eventDate: '',
    duration: '',
    streetNumber: '',
    city: '',
    state: '',
    zipcode: '',
    description: '',
    familyFriendly: '',
    dogFriendly: ''
  })

  const handleDeleteEvent = async (eventId) => {
    const response = await axios.delete(`/deleteEvent/${eventId}`)
    console.log(response.data)
    setEventList(eventList.filter(event => event.eventId !== eventId))
  }

  const handleEditEvent = async (eventId) => {
      // Dispatch action to set edit mode and eventId
      dispatch({ 
        type: 'EDIT_MODE_EVENTID', 
        payload: eventId 
      })
  
      // Fetch the event details using Axios
      const response = await axios.get(`/getEventDetails/${eventId}`)
      const selectedEvent = response.data
  
      // Set the retrieved event in edit mode
      setEditEvent(selectedEvent)
  }

  const handleSaveEdit = async () => {
    await axios.put(`/editUserEvent/${editEvent.eventId}`, editEvent)

    const response = await axios.get(`/getEventsCreatedByUser/${userId}`)
    setEventList(response.data)
    setEditEvent(response.data)
    dispatch({ 
      type: 'EDIT_MODE_EVENTID', 
      payload: null 
    })
  }

useEffect(() => {
  const getAllUserEvents = async () => {
    const response = await axios.get(`/getEventsCreatedByUser/${userId}`)
    setEventList(response.data)
    setEditEvent(response.data)
  }
  getAllUserEvents()
}, [userId])

return (
  <div>
    <Row xs={1} md={2} lg={3} className="g-4">
      {eventList.map((event) => (
        <Col key={event.eventId} className="col mb-4">
          {editModeEventId === event.eventId ? (
            <div>
              <label>Event Name:</label>
                <input 
                  type="text"
                  value={editEvent.eventName}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    eventName: e.target.value
                  })}
                />
              <label>Venue Name:</label>
                <input 
                  type="text"
                  value={editEvent.venueName}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    venueName: e.target.value
                  })}
                />
              <label>Event Date:</label>
                <input 
                  type="date"
                  value={editEvent.eventDate}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    eventDate: e.target.value
                  })}
                />
              <label>Time:</label>
                <input 
                  type="time"
                  value={editEvent.duration}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    duration: e.target.value})}
                />
              <label>Street Number:</label>
                <input 
                  type="text"
                  value={editEvent.streetNumber}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    streetNumber: e.target.value
                  })}
                />
              <label>City:</label>
                <input 
                  type="text"
                  value={editEvent.city}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    city: e.target.value
                  })}
                />
              <label>State:</label>
                <input 
                  type="text"
                  value={editEvent.state}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    state: e.target.value
                  })}
                />
              <label>Zipcode:</label>
                <input 
                  type="text"
                  value={editEvent.zipcode}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    zipcode: e.target.value
                  })}
                />
              <label>Description:</label>
                <input 
                  type="text"
                  value={editEvent.description}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    description: e.target.value
                  })}
                />
              <label>Family Friendly:</label>
                <input 
                  type='checkbox'
                  checked={editEvent.familyFriendly}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    familyFriendly: e.target.checked
                  })}
                />
              <label>Dog Friendly:</label>
                <input 
                  type='checkbox'
                  checked={editEvent.dogFriendly}
                  onChange={(e) => setEditEvent({
                    ...editEvent, 
                    dogFriendly: e.target.checked
                  })}
                />
              <button className='Btn' onClick={() => dispatch({ type: 'EDIT_MODE_EVENTID', payload: null })}>Cancel</button>
              <button className='Btn' onClick={handleSaveEdit}>Save</button>
            </div>
            ) : (
              <Card>
              <Card.Img  variant="top" src={event.eventImgPath} alt="Event" />
              <Card.Body>
                <Card.Title>{event.eventName}</Card.Title>
                <Card.Text>
                  <label>Venue Name:</label>
                    <p>{event.venueName}</p>
                  <label>Date:</label>
                    <p>{event.eventDate}</p>
                  <label>Time:</label>
                    <p>{event.duration}</p>
                  <label>Zipcode:</label>
                    <p>{event.zipcode}</p>
                </Card.Text>
                <div className='User-event-edit-btn'>
                <Button className='Btn' onClick={() => handleEditEvent(event.eventId)}>Edit Event</Button>
                </div>
                <div className='User-event-delete-btn'>
                <Button className='Btn' onClick={() => handleDeleteEvent(event.eventId)}>Delete Event</Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      ))}
    </Row>
  </div>
)
}

export default UserCreatedEvents