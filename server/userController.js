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
}

export default userFunctions