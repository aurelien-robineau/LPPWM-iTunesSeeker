import AsyncStorage from '@react-native-async-storage/async-storage'

import User from './User'

export default class Song {
	constructor(title, album, artist, duration, artworkURL, releaseDate, rating, userId, id = null) {
		this.id          = id ?? null
		this.title       = title
		this.album       = album
		this.artist      = artist,
		this.duration    = duration,
		this.artworkURL  = artworkURL,
		this.releaseDate = releaseDate ? new Date(releaseDate) : null
		this.rating      = rating
		this.userId      = userId
	}

	static createFromJSON(JSON) {
		return new Song(
			JSON.id,
			JSON.title,
			JSON.album,
			JSON.artist,
			JSON.duration,
			JSON.artworkURL,
			JSON.releaseDate,
			JSON.rating,
			JSON.userId,
			JSON.id
		)
	}

	async save() {
		const value = await AsyncStorage.getItem('@itunes-seeker-songs')
		let songs = value ? JSON.parse(value) : []

		if (this.id === null) {
			const lastId = (await Song.getLastId()) + 1
			this.id = lastId
			await Song.setLastId(lastId)
			songs.push(this)
		}
		else {
			songs = songs.filter(song => song.id !== this.id)
			songs.push(this)
		}

		await AsyncStorage.setItem('@itunes-seeker-songs', JSON.stringify(songs))
	}

	static async deleteById(id) {
		const songs = await Song.getAllForCurrentUser()
		const newSongs = songs.filter(song => song.id !== id)
		await AsyncStorage.setItem('@itunes-seeker-songs', JSON.stringify(newSongs))
	}

	static async getById(id) {
		const value = await AsyncStorage.getItem('@itunes-seeker-songs')
		const songs = value ? JSON.parse(value) : []

		const JSONSong = songs.filter(song => song.id === id)[0] ?? null

		if (JSONSong) {
			return Movie.createFromJSON(JSONSong)
		}

		return null
	}

	static async getAllForCurrentUser() {
		const user = await User.getCurrentUser()
		try {
			const value = await AsyncStorage.getItem('@itunes-seeker-songs')
			if (value) {
				return JSON.parse(value)
					.filter(song => song.userId === user.id)
					.map(song => Song.createFromJSON(song))
			}
		} catch(e) {
			return []
		}

		return []
	}

	static async getLastId() {
		const lastId = (await AsyncStorage.getItem('@itunes-seeker-last-song-id')) ?? null
		return lastId ? Number.parseInt(lastId) : 0
	}

	static async setLastId(id) {
		await AsyncStorage.setItem('@itunes-seeker-last-song-id', id.toString())
	}
}