const db = require('../db')

class UserModel {

    async getUsers(limit = null, offset = null) {
        const allUsers = await db.any('SELECT * FROM users LIMIT $1 OFFSET $2', [limit, offset])
        return allUsers
    }

    async getUserById(id) {
        const userById = await db.one('SELECT * FROM users WHERE id = $1', id)
        return userById 
    }

    async createUser(user) {
        const newUser = await db.query(
            'INSERT INTO users (name, surname, birthday, city) VALUES ($1, $2, $3, $4) RETURNING *',
            [user.name, user.surname, user.birthday, user.city]
        )
        return newUser
    }

    async updateUser(id, user) {
        const updatedUser = await db.one(
            'UPDATE users SET name = $1, surname = $2, birthday = $3, city = $4 WHERE id = $5 RETURNING *',
            [user.name, user.surname, user.birthday, user.city, id]
        )
        return updatedUser
    }

    async deleteUser(id) {
        const deletedUser = await db.none('DELETE FROM users WHERE id = $1', id)
        return deletedUser
    }

}

module.exports = new UserModel()