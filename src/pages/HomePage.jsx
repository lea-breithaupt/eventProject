import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import CreateUserEvent from '../components/CreateUserEvent'
import UserCreatedEvents from '../components/UserCreatedEvents'
import UserUpcomingEvents from '../components/UserUpcomingEvents'
import UserFavoritedEvents from '../components/UserFavoritedEvents'
import UserSuggestedEvents from '../components/EventBriteEvents'
import EventsByZipcode from '../components/EventsByZipcode'

const HomePage = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.isLoggedIn)
  const userId = useSelector((state) => state.userId);

  const [eventList, setEventList] = useState([])
  const [firstname, setFirstName] = useState('')
  const [displayEventCreationForm, setDisplayEventCreationForm] = useState(false)
  const [showEventSuccessMessage, setShowEventSuccessMessage] = useState(false);


  const addToEventList = (savedEvent) => {
    setEventList([...eventList, savedEvent])
    setShowEventSuccessMessage(true)
    setTimeout(() => {
      setShowEventSuccessMessage(false)
    }, 2000)
  }

  const toggleEventCreationForm = () => {
    console.log(displayEventCreationForm)
    setDisplayEventCreationForm((prev) => !prev);
    setShowEventSuccessMessage(false);
  }

  const cancelEventCreation = () => {
    setDisplayEventCreationForm(false);
    setShowEventSuccessMessage(false);
  }
  
  const closeEventCreationForm = () => {
    setDisplayEventCreationForm(false);
  }

  useEffect(() => {
    const getUsersFirstName = async () => {
      const response = await axios.get('/getUsersFirstName')
      const userFirstName = response.data.firstName;
      setFirstName(userFirstName)
  }

  getUsersFirstName()
}, [])

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Welcome, {firstname}</h2>
          <div>
            {displayEventCreationForm ? (
              <div>
              <CreateUserEvent
                addToEventList={addToEventList}
                closeEventCreationForm={closeEventCreationForm}
              />
              <button onClick={cancelEventCreation}>Cancel</button>
            </div>
            ) : (
              <button onClick={toggleEventCreationForm}>
                Create New Event
              </button>
            )}
            {showEventSuccessMessage && <p>Event successfully created!</p>}
          </div>

          <div>
            <h2>{firstname}'s Created Events</h2>
            <UserCreatedEvents
              eventList={eventList}
              setEventList={setEventList}
            />
          </div>

          <div>
            <h2>{firstname}'s Upcoming Events</h2>
            <UserUpcomingEvents 
            />
          </div>

          <div>
            <h2>{firstname}'s Favorite Events</h2>
            <UserFavoritedEvents 
            />
          </div>

          <div>
            <h2>Events happening around your city:</h2>
            <EventsByZipcode 
            />
          </div>
          
        </div>
      ) : (
        <div>
          <h4>Log In or Join to check out what is happening within your city limits!</h4>
        </div>
      )}
    </div>
  ) 
}

export default HomePage
