import { User, Event, Category, Favorite} from '../db/model.js'

const eventFunctions = {
    addUserEvent: async (req, res) => {
        if(req.session.userId) {
          const { 
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
          } = req.body

          const newUserEvent = await Event.create({
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

    getEventDetails: async (req, res) => {
        const { userId } = req.params

        const userEvents = await Event.findAll({
            where: {
                userId: +userId,
            }
        })

        if(!userEvents){
            return res.status(404).json({ message: 'Event not found'})
        }

        res.status(200).send(userEvents)
    },   
    
    // getEventsCreatedByUser: async (req, res) => {
    //     const { userId } = req.params;
      
    //     try {
    //       const userEvents = await User.findByPk(userId, {
    //         include: Event, // Assuming you've established the association between User and Event
    //       });
      
    //       if (!userEvents || userEvents.Events.length === 0) {
    //         return res.status(404).json({ message: 'No events found for this user' });
    //       }
      
    //       res.status(200).json(userEvents.Events);
    //     } catch (error) {
    //       console.error('Error fetching events:', error);
    //       res.status(500).json({ message: 'Internal server error' });
    //     }
    //   },
    

    // getEventsCreatedByUser: async (req, res) => {
    //     const { userId } = req.params

    //     const userEvents = await User.findOne({
    //         where: { userId },
    //         include: [{ model: Event }]
    //     })

    //     if(!userEvents || !userEvents.Events) {
    //         return res.status(404).json({ message: 'No events found for this user'})
    //     }

    //     res.status(200).send(userEvents.Events)
    // },

    // getEventsByZipcode: async (req, res) => {
    //     const { userId } = req.body

    //     // Retrieve the logged-in user's zipcode 
    //     const userWithEvents = await User.findByPk(userId, {
    //         include: Event,
    //     })

    //     if(!userWithEvents) {
    //         return res.status(404).json({ message: 'User does not have any current events'})
    //     }

    //     const userZipcode = userWithEvents.zipcode

    //     // Extract events with matching zipcode
    //     const eventsInUserZipcode = userWithEvents.Events.filter(event => event.zipcode === userZipcode);

    //     if (eventsInUserZipcode.length > 0) {
    //         res.json(eventsInUserZipcode);
    //     } else {
    //         res.status(404).json({ message: 'No events found in the user\'s zipcode.' });
    //     }
    // },

    deleteEvent: async (req, res) => {
        const { userId } = req.session
        const eventIdToDelete = req.params.eventId
      
        if (!userId) {
          return res.status(403).json('User not found')
        }
      
        try {
          const eventToDelete = await Event.findOne({
            where: {
              userId,
              eventId: eventIdToDelete
            }
          });
      
          if (!eventToDelete) {
            return res.status(404).json('Event not found')
          }
      
          await eventToDelete.destroy()
      
          res.status(201).json('Event has been deleted')
        } catch (error) {
          console.error('Error deleting event:', error)
          res.status(500).json('Internal server error')
        }
      },

      allUserEvents: async (req, res) => {
        const loggedInUser = req.session.userId

        if(!loggedInUser) {
            return res.status(401).json({ message: 'User not authenticated'})
        }

        const userEvents = await Event.findAll({
            where: {
                userId: loggedInUser
            }
        })
        res.status(200).send(userEvents)
      },

    editEvent: (req, res) => {

    }
}
export default eventFunctions