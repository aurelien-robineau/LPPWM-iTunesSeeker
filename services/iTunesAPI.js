import axios from 'axios'

const config = {
	baseUrl: 'https://itunes.apple.com/search'
}

const iTunesAPI = {
	searchSongs: research => {
		return axios.get(`${config.baseUrl}?term=${research}&country=FR&lang=fr_fr&media=music`)
	}
}

export default iTunesAPI