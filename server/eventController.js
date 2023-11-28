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

      editUserEvent: async (req, res) => {
        const { userId } = req.session;
        const { eventId } = req.params;
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
          dogFriendly,
          familyFriendly
        } = req.body
      
        // Check if the event exists and is created by the logged-in user
        const userEvent = await Event.findOne({
          where: {
            userId: userId,
            eventId: eventId
          }
        });
      
        if (!userEvent) {
          return res.status(404).json({ error: 'Event not found or not authorized to edit' })
        }
      
        // Update the event attributes as needed
        if(userEvent) {
          userEvent.eventName = eventName
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

      favoriteEvent: async (req, res) => {
        const { eventId } = req.params
        const { userId } = req.session
      
        try {
          // Create a favorite for the logged-in user and specified eventId
          const newFavorite = await Favorite.create({
            eventId: eventId,
            userId: userId,
            comment: req.body.comment, // If you have a comment field in the request body
          });
      
          res.status(201).json({ message: 'Event favorited successfully!', favorite: newFavorite });
        } catch (error) {
          res.status(500).json({ error: 'Unable to favorite the event.' });
        }
      },

      getUserFavoritedEvents: async (req, res) => {
        const { userId } = req.session; // Assuming userId is available in the session
      
        try {
          // Find all favorited events for the logged-in user
          const userFavoritedEvents = await Favorite.findAll({
            where: { userId: userId },
            include: [{ model: Event }], // Assuming you have imported Event model from model.js
          });
      
          res.status(200).json(userFavoritedEvents);
        } catch (error) {
          res.status(500).json({ error: 'Unable to fetch user\'s favorited events.' });
        }
      },
}

export default eventFunctions