import axios from 'axios'

const config = {
	key: 'ea178c90'
}

const OMBdAPI = {
	getMovieByName: name => {
		return axios.get(`http://www.omdbapi.com/?t=${name}&apikey=${config.key}`)
	}
}

export default OMBdAPI