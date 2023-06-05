const postModel = require('../models/post.model')

class PostController {

    async getPosts(req, res) {
        try {
            const { limit = null, offset = null } = req.query
            const posts = await postModel.getPosts(limit, offset)
            res.json(posts)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

    async createPost(req, res) {
        try {
            const newPost = await postModel.createPost(req.body)
            res.json(newPost)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

    async updatePost(req, res) {
        try {
            const { id, ...postData } = req.body
            const updatedPost = await postModel.updatePost(id, postData)
            res.json(updatedPost)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

    async deletePost(req, res) {
        try {
            const id = req.params.id
            const post = await postModel.deletePost(id)
            res.json(post)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' })
        }
    }

}

module.exports = new PostController()








