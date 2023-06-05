const db = require('../db')

class PostModel {

    async getPosts(limit = null, offset = null) {
        const allPosts = await db.any('SELECT * FROM posts LIMIT $1 OFFSET $2', [limit, offset])
        return allPosts
    }

    async createPost(post) {
        const newPost = await db.query(
            'INSERT INTO posts (title, content, created_at, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [post.title, post.content, post.created_at, post.user_id]
        )
        return newPost
    }

    async updatePost(id, post) {
        const updatedPost = await db.one(
            'UPDATE posts SET title = $1, content = $2, created_at = $3, user_id = $4 WHERE id = $5 RETURNING *',
            [post.title, post.content, post.created_at, post.user_id, id]
        )
        return updatedPost
    }

    async deletePost(id) {
        const deletedPost = await db.none('DELETE FROM posts WHERE id = $1', id)
        return deletedPost
    }

}

module.exports = new PostModel()