import AsyncStorage from '@react-native-async-storage/async-storage'
import bcrypt from 'react-native-bcrypt'

const SALT = 10

export default class User {
	static onLogout = null

	constructor(username, password, id = null) {
		this.id       = id
		this.username = username
		this.password = password ? bcrypt.hashSync(password, SALT) : null
	}

	async save () {
		const value = await AsyncStorage.getItem('@users')
		let users = value ? JSON.parse(value) : []

		const lastId = (await User.getLastId()) + 1
		this.id = lastId
		await User.setLastId(lastId)

		users.push(this)

		await AsyncStorage.setItem('@users', JSON.stringify(users))
	}

	static async login(username, password) {
		const value = await AsyncStorage.getItem('@users')
		const users = value ? JSON.parse(value) : []

		const JSONUser = users.filter(user => user.username === username)[0] ?? null

		if (JSONUser && bcrypt.compareSync(password, JSONUser.password)) {
			await AsyncStorage.setItem('@user', JSON.stringify({
				id: JSONUser.id,
				username: JSONUser.username
			}))

			return true
		}

		return false
	}

	static async isUsernameAvailable(username) {
		const value = await AsyncStorage.getItem('@users')
		let users = value ? JSON.parse(value) : []

		for (let user of users) {
			if (user.username === username)
				return false
		}

		return true
	}

	static async logout() {
		await AsyncStorage.removeItem('@user')
		User.onLogout()
	}

	static async getCurrentUser() {
		const value = await AsyncStorage.getItem('@user')
		const JSONUser = value ? JSON.parse(value) : null
		return JSONUser ? new User(JSONUser.username, null, JSONUser.id) : null
	}

	static async getLastId() {
		const lastId = (await AsyncStorage.getItem('@lastUserId')) ?? null
		return lastId ? Number.parseInt(lastId) : 0
	}

	static async setLastId(id) {
		await AsyncStorage.setItem('@lastUserId', id.toString())
	}

	static setOnLogout(onLogout) {
		User.onLogout = onLogout
	}
}