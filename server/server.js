import express from 'express'
import ViteExpress from 'vite-express'
import morgan from 'morgan'
import axios from 'axios'
import session from 'express-session'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
app.use(express.static('public'))
app.use(express.json())
app.use(session({
    secret:'your-secret-key', 
    resave: false, 
    saveUninitialized: true, 
    cookie: {secure: false}
}))

import authFunctions from './authController.js'
import userFunctions from './userController.js'
import eventFunctions from './eventController.js'


// Routes go here: 
// Authentication routes:
app.post('/login', authFunctions.login)
app.get('/logout', authFunctions.logout)
app.get('/sessionCheck', authFunctions.sessionCheck)

// User routes:
app.post('/register', userFunctions.register)
app.get('/getUsersFirstName', userFunctions.getUsersFirstName)
app.get('/getUserProfile/:userId', userFunctions.getUserProfile)
app.put('/updateUserProfile/:userId', userFunctions.updateUserProfile)
app.delete('/deleteUserProfile', userFunctions.deleteUserProfile)

// Event routes:
app.post('/addUserEvent', eventFunctions.addUserEvent)
app.get('/getEventsCreatedByUser/:userId', eventFunctions.getEventsCreatedByUser)
app.put('/editUserEvent/:eventId', eventFunctions.editUserEvent)
app.delete('/deleteEvent/:eventId', eventFunctions.deleteEvent)
app.get('/getEventDetails/:eventId', eventFunctions.getEventDetailsById)
app.get('/getEventsByUserZipcode', eventFunctions.getEventsByUserZipcode)

ViteExpress.listen(app, 5050, () => console.log(`http://localhost:5050`))