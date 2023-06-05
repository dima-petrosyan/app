import { instance } from './config'

export const postsApi = {

	getPosts(offset = 0, limit = 1000) {
		return instance.get(`post?offset=${offset}&limit=${limit}`)
			.then(response => response.data)
	},

	createPost(post) {
		return instance.post('post', { ...post })
			.then(response => response.data)
	},

	updatePost(id, post) {
		return instance.put('post', { id, ...post })
			.then(response => response.data)
	},

	deletePost(id) {
		return instance.delete(`post/${id}`)
			.then(response => response.data)
	}

}