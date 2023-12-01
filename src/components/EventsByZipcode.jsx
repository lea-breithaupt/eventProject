import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Button, Row, Col } from 'react-bootstrap';

const UserEventsByZipcode = () => {
  const [userEvents, setUserEvents] = useState([])
  const userId = useSelector((state) => state.userId)

  const handleFavoriteEvent = async (eventId) => {
      await axios.post(`/favoriteEvent/${eventId}`, userId)
      const updatedEvents = userEvents.filter((event) => event.eventId !== eventId)
      setUserEvents(updatedEvents)
  }

  useEffect(() => {
    const getUserEventsByZipcode = async () => {
      try {
        const response = await axios.get('/getEventsByUserZipcode')
        setUserEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    if (userId) {
      getUserEventsByZipcode()
    }
  }, [userId])

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
  {userEvents.map((event) => (
    <Col key={event.eventId}>
      <Card>
        <Card.Img variant="top" src={event.eventImgPath} alt="Event" />
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
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
  )
}

export default UserEventsByZipcode