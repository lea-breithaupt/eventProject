import { User, Event, Favorite, Category, db } from './model.js'
import lodash from 'lodash'
import bcryptjs from 'bcryptjs'

console.log("Syncing database")
await db.sync({ force: true })
console.log("Seeding database")

const categories = ["sports", "concerts", "music festivals", "holiday events", "comedy",
"farmers market"]
const categoryTypes = ["main", "local", "user created events"]
const dbCategories = []

for (let category of categories) {
    const newCategory = await Category.create({
        categoryName: category,
        categoryType: "main"
    }) 
    dbCategories.push(newCategory)
}

const cities = ["Birmingham", "Mobile", "Huntsville", "Montgomery", "Dauphin Island"]

let i = 1
while (i < 6) {
    const salt = bcryptjs.genSaltSync(5)
    const hash = bcryptjs.hashSync('test', salt)

  
    const newUser = await User.create({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: hash,
        firstName: 'Jane',
        lastName: 'Doe',
        zipcode: '12345'
    })

    const newEvent = await newUser.createEvent({
        eventName: `User${i}'s Event`,
        // eventImg: '',
        venueName: 'Venue A',
        eventDate: '12/20/22',
        duration: '3 hours',
        streetNumber: '123 Main St',
        city: lodash.sample(cities),
        state: 'AL',
        zipcode: '12345',
        description: 'Description for event 1',
        familyFriendly: true,
        dogFriendly: false,
    })

    const randomCategory = lodash.sample(dbCategories)

    await newUser.addCategory(randomCategory)
    await newEvent.addCategory(randomCategory)

    i++
}

const users = await User.findAll()
const events = await Event.findAll()

for(let user of users) {
    const event = lodash.sample(events)

    await user.createFavorite({
        eventId: event.eventId,
        comment: `I declare that I, ${user.username} am favoriting ${event.title}`
    })
}
console.log("DB seeded successfully")

await db.close()