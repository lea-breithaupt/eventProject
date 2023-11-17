import { User, Event, Favorite, Category, db } from './model.js'

console.log(await User.findAll())

await db.close()