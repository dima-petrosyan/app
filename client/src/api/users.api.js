import { instance } from './config'

export const usersApi = {

	getUsers(offset = 0, limit = 1000) {
		return instance.get(`user?offset=${offset}&limit=${limit}`)
			.then(response => response.data)
	},

}