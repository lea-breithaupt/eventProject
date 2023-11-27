import { User, Event, Category, Favorite} from '../db/model.js'
import { Op } from 'sequelize'
import bcryptjs from 'bcryptjs'

const userFunctions = {

    register: async (req, res) => {
        const { username, email, password, firstName, lastName, zipcode} = req.body

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        })

        if(existingUser){
            return res.status(400).json({ message: "User already exists. Please choose a different username."})
        }

        const salt = await bcryptjs.genSalt(5)
        const hash = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            password: hash,
            firstName,
            lastName,
            zipcode
        })

        res.json({
            message: 'New user created and logged in',
            userId: newUser.userId
        })
    },

    userProfile: async (req, res) => {
        const { userId } = req.session

        const user = await User.findByPk(userId)
        
        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if(user) {
            return res.status(200).json(user)
        } else {
            console.error('Error fetching user profile', error)
            res.status(500).json({ message: 'Internal server error'})
        }
    }, 

    updateUserProfile: async (req, res) => {
        const { userId } = req.session
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            zipcode
        } = req.body

        const user = await User.findByPk(userId)
       
        if(!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        if(user) {
            user.username = username
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.password = password
            user.zipcode = zipcode
    
            await user.save()
            return res.status(200).json({ message: 'User information updated successfully'})
        } else {
            console.error('Error updating user profile:', error)
            res.status(500).json({ message: 'Internal server error'})
        }
    },
    
    deleteUserProfile: async (req, res) => {
        const { userId } = req.session

        const user = await User.findByPk(userId)

        if(!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        await user.destroy()
        req.session.destroy()

        return res.status(200).json({ message: 'User account deleted successfully'})
    }
}

export default userFunctions