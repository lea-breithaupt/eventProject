import { User, Event, Category, Favorite} from '../db/model.js'

const eventFunctions = {
    addUserEvent: async (req, res) => {
        if(req.session.userId) {
          const { 
              eventName, 
              eventImgPath,
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
          } = req.body

          const newUserEvent = await Event.create({
              eventName,
              eventImgPath,
              venueName,
              eventDate,
              duration,
              streetNumber,
              city,
              state,
              zipcode,
              description,
              familyFriendly,
              dogFriendly,
              userId: req.session.userId
          })

          res.status(201).json({
              message: 'New event created',
              event: newUserEvent
          })
        } else {
          res.status(403).send('not authorized')
        }
    },   

    getEventsCreatedByUser: async (req, res) => {
        const { userId } = req.session

        const userEvents = await Event.findAll({
            where: { 
              userId: userId 
            },
        })

        res.status(200).send(userEvents)
    },

    editUserEvent: async (req, res) => {
      const { userId } = req.session;
      const { eventId } = req.params;
      const {
        eventName,
        eventImgPath,
        venueName,
        eventDate,
        duration,
        streetNumber,
        city,
        state,
        zipcode,
        description,
        dogFriendly,
        familyFriendly
      } = req.body
    
      const userEvent = await Event.findOne({
        where: {
          userId: userId,
          eventId: eventId
        }
      })
    
      if (!userEvent) {
        return res.status(404).json({ error: 'Event not found or not authorized to edit' })
      }
    
      if(userEvent) {
        userEvent.eventName = eventName
        userEvent.eventImgPath = eventImgPath
        userEvent.venueName = venueName
        userEvent.eventDate = eventDate
        userEvent.duration = duration
        userEvent.streetNumber = streetNumber
        userEvent.city = city
        userEvent.state = state
        userEvent.description = description
        userEvent.zipcode = zipcode
        userEvent.familyFriendly = familyFriendly
        userEvent.dogFriendly = dogFriendly

        await userEvent.save()
    
        return res.status(200).json({ message: 'Event updated successfully', event: userEvent })
      } else {
        console.error('Error updating event:', error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    },

    deleteEvent: async (req, res) => {
        const { userId } = req.session
        const eventIdToDelete = req.params.eventId
      
        if (!userId) {
          return res.status(403).json('User not found')
        }
        
        const eventToDelete = await Event.findOne({
          where: {
            userId,
            eventId: eventIdToDelete
          }
        })
      
        if (!eventToDelete) {
          return res.status(404).json('Event not found')
        }
      
        await eventToDelete.destroy()
        res.status(201).json('Event has been deleted')
      },

      getEventDetailsById: async (req, res) => {
        try {
          const { eventId } = req.params;
      
          const eventDetails = await Event.findOne({
            where: { eventId: eventId }
          });
      
          if (!eventDetails) {
            return res.status(404).json({ error: 'Event not found' });
          }
      
          return res.status(200).json(eventDetails);
        } catch (error) {
          console.error('Error fetching event details:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      },

      getEventsByUserZipcode: async (req, res) => {
        const { userId } = req.session
      
        const user = await User.findByPk(userId)
        const userZipcode = user.zipcode
      
        const events = await Event.findAll({
          where: {
            zipcode: userZipcode,
          },
        })
      
        res.status(200).send(events)
      },
}

export default eventFunctions