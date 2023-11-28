import { DataTypes, Model } from "sequelize";
import connectToDB from "./db.js";
import util from 'util'

export const db = await connectToDB('postgresql:///events_all_around')

export class User extends Model {
    [util.inspect.custom] () {
        return this.toJSON()
    }
}

User.init (
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false 
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.STRING(5),
            allowNull: false
        }
    }, {
        modelName: 'user',
        sequelize: db
    }
)

export class Event extends Model {
    [util.inspect.custom] () {
        return this.toJSON()
    }
}
Event.init (
    {
        eventId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        eventName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // eventImg: {
        //     type: DataTypes.BLOB,
        //     allowNull: false
        // },
        venueName: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        eventDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        streetNumber: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
            // unique: true
        },
        zipcode: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        familyFriendly: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        dogFriendly: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        modelName: 'event',
        sequelize: db
    }
)

export class Category extends Model {
    [util.inspect.custom] () {
        return this.toJSON()
    }
}
Category.init(
    {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING(20), 
            allowNull: false
        },
        categoryType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        modelName: 'category',
        sequelize: db
    }
)

export class Favorite extends Model {
    [util.inspect.custom] () {
        return this.toJSON()
    }
}
Favorite.init(
    {
        favoriteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    } , {
        modelName: 'favorite',
        sequelize: db
    }
)

User.hasMany(Event, {foreignKey: 'userId'})
Event.belongsTo(User, {foreignKey: 'userId'})

Category.hasMany(Event, {foreignKey: 'categoryId'})
Event.belongsTo(Category, {foreignKey: 'categoryId'})

User.hasMany(Favorite, {foreignKey: 'userId'})
Favorite.belongsTo(User, {foreignKey: 'userId'})

Event.belongsToMany(Category, {through: 'EventCategories'})
Category.belongsToMany(Event, {through: 'EventCategories'})

User.belongsToMany(Category, {through: 'UserPreferences'})
Category.belongsToMany(User, {through: 'UserPreferences'})

Favorite.belongsTo(Event, { foreignKey: 'eventId' })