import { useState } from 'react'
import axios from 'axios'

const CreateUserEvent = ({ addToEventList, closeEventCreationForm }) => {
    const [eventName, setEventName] = useState('')
    const [venueName, setVenueName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [duration, setDuration] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [description, setDescription] = useState('')
    const [familyFriendly, setFamilyFriendly] = useState(false)
    const [dogFriendly, setDogFriendly] = useState(false)

    const createNewEvent = async (e) => {
        e.preventDefault()

        const response = await axios.post(`/addUserEvent`, {
            eventName,
            venueName,
            eventDate,
            duration,
            streetNumber,
            city,
            state,
            zipcode,
            description,
            familyFriendly,
            dogFriendly
        })
        const savedEvent = response.data.event
        addToEventList(savedEvent)

        setEventName('')
        setVenueName('')
        setEventDate('')
        setDuration('')
        setStreetNumber('')
        setCity('')
        setState('')
        setZipcode('')
        setDescription('')
        setFamilyFriendly('')
        setDogFriendly('')

      closeEventCreationForm()
    }
    
  return (
    <div>
        <form onSubmit={createNewEvent}>
        <label>Event Name:</label>
            <input 
                placeholder='Event Name'
                type='text'
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required={true}
            />
        <label>Venue:</label>
            <input 
                placeholder='Venue'
                type='text'
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                required={true}
            />
        <label>Date:</label>
            <input 
                placeholder='Date'
                type='date'
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required={true}
            />
        <label>Time:</label>
            <input 
                placeholder='Time'
                type='time'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required={true}
            />
        <label>Street Number:</label>
            <input 
                placeholder='Street Number'
                type='text'
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                required={true}
            />
        <label>City:</label>
            <input 
                placeholder='City'
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required={true}
            />
        <label>State:</label>
            <input 
                placeholder='State'
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required={true}
            />
        <label>Zipcode:</label>
            <input 
                placeholder='Zipcode'
                type='text'
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required={true}
            />
        <label>Description:</label>
            <input 
                placeholder='Description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
            />
        <label>Family Friendly:</label>
            <input 
                type='checkbox'
                checked={familyFriendly}
                onChange={(e) => setFamilyFriendly(e.target.checked)}
            />
        <label>Dog Friendly:</label>
            <input 
                type='checkbox'
                checked={dogFriendly}
                onChange={(e) => setDogFriendly(e.target.checked)}
            />
        <button type='submit'>
            Create Event!
        </button>
        </form>
    </div>
  )
}

export default CreateUserEvent 