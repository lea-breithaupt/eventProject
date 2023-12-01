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
        eventName: `User${i}'s Event: Mardi Gras Parade`,
        eventImgPath: 'https://assets.editorial.aetnd.com/uploads/2010/01/mardi-gras-gettyimages-175180560.jpg',
        venueName: 'French Quarter',
        eventDate: '12/20/22',
        duration: '12:30PM',
        streetNumber: '123 Main St',
        city: lodash.sample(cities),
        state: 'AL',
        zipcode: '12345',
        description: 'Description for event 1',
        familyFriendly: true,
        dogFriendly: false,
    })

    const otherEvent = await newUser.createEvent({
        eventName: `User${i}'s event: LSU Watch Party`,
        eventImgPath: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_03/3184546/200114-lsu-joe-burrow-rd-0123a.JPG',
        venueName: 'The Rusty Nail',
        eventDate: '12/20/22',
        duration: '12:30PM',
        streetNumber: '123 Main St',
        city: lodash.sample(cities),
        state: 'AL',
        zipcode: '84117',
        description: 'Description for event 1',
        familyFriendly: true,
        dogFriendly: false,
    })

    const thirdEvent = await newUser.createEvent({
        eventName: `User${i}'s event: Crawfish Boil`,
        eventImgPath: 'https://drive.google.com/uc?export=view&id=1yuv3d6iyfIgkUn8rks1-xw3TEjC9z74h',
        venueName: "Brennan's",
        eventDate: '12/20/22',
        duration: '12:30PM',
        streetNumber: '123 Main St',
        city: lodash.sample(cities),
        state: 'AL',
        zipcode: '84117',
        description: 'Description for event 1',
        familyFriendly: true,
        dogFriendly: false,
    })

    const randomCategory = lodash.sample(dbCategories)

    await newUser.addCategory(randomCategory)
    await newEvent.addCategory(randomCategory)
    await otherEvent.addCategory(randomCategory)

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