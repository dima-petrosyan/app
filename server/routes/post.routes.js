const Router = require('express')
const router = new Router()
const postController = require('../controllers/post.controller')

router.get('/post', postController.getPosts)
router.post('/post', postController.createPost)
router.put('/post', postController.updatePost)
router.delete('/post/:id', postController.deletePost)

module.exports = router