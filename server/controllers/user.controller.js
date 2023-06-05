const userModel = require('../models/user.model')

class UserController {

    async getUsers(req, res) {
        try {
            const { limit = null, offset = null } = req.query
            const users = await userModel.getUsers(limit, offset)
            res.json(users)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userModel.getUserById(req.params.id)
            res.json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

    async createUser(req, res) {
        try {
            const newUser = await userModel.createUser(req.body)
            res.json(newUser)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

    async updateUser(req, res) {
        try {
            const { id, ...userData } = req.body
            const updatedUser = await userModel.updateUser(id, userData)
            res.json(updatedUser)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await userModel.deleteUser(id)
            res.json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

}

module.exports = new UserController()