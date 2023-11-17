import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import CreateUserEvent from '../components/CreateUserEvent'
import UserCreatedEvents from '../components/UserCreatedEvents'
import UserUpcomingEvents from '../components/UserUpcomingEvents'
import UserFavoritedEvents from '../components/UserFavoritedEvents'
import UserSuggestedEvents from '../components/UserSuggestedEvents'
import CreateUserEventBtn from '../components/CreateUserEventBtn'

const HomePage = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.isLoggedIn)
  const userId = useSelector((state) => state.user.userId);

  const [eventList, setEventList] = useState([])
  const [firstname, setFirstName] = useState('')

  const handleAddEvent = async (newEvent) => {
    const response = await axios.post(`/addUserEvent/${userId}`, newEvent)
      .then(res => {
        dispatch({
          type: 'authenticated',
          payload: res.data.userId
        })
      })
    const savedEvent = response.data.event;
    setEventList([...eventList, savedEvent])
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
            <CreateUserEventBtn />
            <CreateUserEvent onSuccess={handleAddEvent}/>
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
            <UserUpcomingEvents />
          </div>

          <div>
            <h2>{firstname}'s Favorite Events</h2>
            <UserFavoritedEvents />
          </div>

          <div>
            <h2>Suggested Events for {firstname}</h2>
            <UserSuggestedEvents />
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
