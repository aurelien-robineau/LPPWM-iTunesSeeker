import AsyncStorage from '@react-native-async-storage/async-storage'

import User from './User'

export default class Movie {
	constructor(title, posterURI, releaseDate, summary, comments, rating, imdbLink, userId, id = null) {
		this.id          = id ?? null
		this.title       = title
		this.posterURI   = posterURI,
		this.releaseDate = releaseDate ? new Date(releaseDate) : null
		this.summary     = summary
		this.comments    = comments
		this.rating      = rating
		this.imdbLink    = imdbLink
		this.userId      = userId
	}

	static createFromJSON(JSON) {
		return new Movie(
			JSON.title,
			JSON.posterURI,
			JSON.releaseDate,
			JSON.summary,
			JSON.comments,
			JSON.rating,
			JSON.imdbLink,
			JSON.userId,
			JSON.id
		)
	}

	async save () {
		const value = await AsyncStorage.getItem('@movies')
		let movies = value ? JSON.parse(value) : []

		if (this.id === null) {
			const lastId = (await Movie.getLastId()) + 1
			this.id = lastId
			await Movie.setLastId(lastId)
			movies.push(this)
		}
		else {
			movies = movies.filter(movie => movie.id !== this.id)
			movies.push(this)
		}
		await AsyncStorage.setItem('@movies', JSON.stringify(movies))
	}

	static async deleteById(id) {
		const movies = await Movie.getAllForCurrentUser()
		const newMovies = movies.filter(movie => movie.id !== id)
		await AsyncStorage.setItem('@movies', JSON.stringify(newMovies))
	}

	static async getById(id) {
		const value = await AsyncStorage.getItem('@movies')
		const movies = value ? JSON.parse(value) : []

		const JSONMovie = movies.filter(movie => movie.id === id)[0] ?? null

		if (JSONMovie) {
			return Movie.createFromJSON(JSONMovie)
		}

		return null
	}

	static async getAllForCurrentUser() {
		const user = await User.getCurrentUser()
		try {
			const value = await AsyncStorage.getItem('@movies')
			if (value) {
				return JSON.parse(value)
					.filter(movie => movie.userId === user.id)
					.map(movie => Movie.createFromJSON(movie))
			}
		} catch(e) {
			return []
		}

		return []
	}

	static async getLastId() {
		const lastId = (await AsyncStorage.getItem('@lastMovieId')) ?? null
		return lastId ? Number.parseInt(lastId) : 0
	}

	static async setLastId(id) {
		await AsyncStorage.setItem('@lastMovieId', id.toString())
	}
}