import { useState } from 'react'
import CreateUserEvent from './CreateUserEvent'
import { useDispatch } from 'react-redux'

const CreateUserEventBtn = ({ onEventCreate }) => {
  const [showForm, setShowForm] = useState(false)

  const handleCreateEvent = () => {
    setShowForm(true)
  }

  const handleEventCreated = () => {
    onEventCreate(true)
    setShowForm(false)
  }

  return (
    <div>
      <button onClick={handleCreateEvent}>Create New Event</button>
      {showForm && (
        <CreateUserEvent
          onSuccess={handleEventCreated} // Call handleEventCreated when an event is successfully created
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default CreateUserEventBtn