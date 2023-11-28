import { User, Event, Category, Favorite} from '../db/model.js'
import bcryptjs from 'bcryptjs'

const authFunctions = {

    login: async (req, res) => {
        const { username, password } = req.body
        
        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if(user) {
            if (bcryptjs.compareSync(password, user.password)) {
                req.session.userId = user.userId
                res.status(200).json({ userId: user.userId })
            } else res. status(401).json({ message: 'Invalid username or password, please try again!'})
        } else {
            res.status(401).json({ message: 'Invalid username or password, please try again!'})
        } 

    },

    logout: async (req, res) => {
        req.session.destroy()
        res.json('Session destroyed.')
    },

    sessionCheck: async (req, res) => {
        if(req.session.userId) {
            res.json({ userId: req.session.userId })
        } else {
            res.json('no user logged in')
        }
    },

    getUsersFirstName: async (req, res) => {
        const userId = req.session.userId
        if(userId) {
         const user = await User.findOne({
            where: {
                userId: userId
            }
        })

        if(user) {
         const usersFirstName = {
            firstName: user.firstName
         }
         return res.json(usersFirstName)
        }
        }
        res.status(401).json({ message: 'User not found or not logged in.' })
    }
}

export default authFunctions