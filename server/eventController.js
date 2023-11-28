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

    getEventsCreatedByUser: async (req, res) => {
        const { userId } = req.session

        const userEvents = await Event.findAll({
            where: { 
              userId: userId 
            },
        })

        res.status(200).send(userEvents)
    },

    getEventsByUserZipcode: async (req, res) => {
      const { userId } = req.session;
    
      // Fetch user's zipcode
      const user = await User.findByPk(userId);
      const userZipcode = user.zipcode;
    
      // Find events with matching zipcode
      const events = await Event.findAll({
        where: {
          zipcode: userZipcode,
        },
      });
    
      res.status(200).send(events);
    },

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

    // editEvent: async (req, res) => {
    //   const eventId = req.params.eventId
    //   const { 
    //     eventName, 
    //     venueName, 
    //     eventDate, 
    //     duration, 
    //     streetNumber, 
    //     city, 
    //     state, 
    //     zipcode, 
    //     description, 
    //     familyFriendly, 
    //     dogFriendly
    //   } = req.body

    //   const eventToUpdate = await Event.findByPk(eventId)

    //   if(!eventToUpdate || eventToUpdate.userId !== req.session.userId) {
    //     return res.status(404).json({message:'Event not found or unauthorized'})
    //   }
      
    //     eventToUpdate.eventName = eventName
    //     eventToUpdate.venueName = venueName
    //     eventToUpdate.eventDate = eventDate
    //     eventToUpdate.duration = duration
    //     eventToUpdate.streetNumber = streetNumber
    //     eventToUpdate.city = city
    //     eventToUpdate.state = state
    //     eventToUpdate.zipcode = zipcode
    //     eventToUpdate.description = description
    //     eventToUpdate.familyFriendly = familyFriendly
    //     eventToUpdate.dogFriendly = dogFriendly

    //     await eventToUpdate.save()
    //     res.status(200).json({ message: 'Event updated successfully', event: eventToUpdate })
    // },

    // favoriteEvent: async (req, res) => {
    //   const { eventId } = req.params
    //   const { userId } = req.session

    //   const existingFavorite = await Favorite.findOne({
    //     where: {
    //       userId,
    //       eventId
    //     }
    //   })

    //   if(existingFavorite) {
    //     return res.status(400).json({ message: 'Event already favorited'})
    //   }

    //   await Favorite.create({ userId, eventId })

    //   res.status(200).json({ message: 'Event favorited successfully'})
    // },

    // userFavoriteEvents: async (req, res) => {
    //   const { userId } = req.session

    //   const userFavorites = await Favorite.findAll({
    //     where: { userId },
    //     include: [{ model: Event }]
    //   })

    //   res.status(200).json(userFavorites)
    // }
}

export default eventFunctions