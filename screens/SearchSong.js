import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, Image, ScrollView } from 'react-native'
import CustomButton from '../components/CustomButton'
import RatingView from '../components/RatingView'

import OMBdAPI from '../services/OMBdAPI'

const SearchSong = ({ navigation }) => {
	// const [research, setResearch] = useState(null)
	// const [movie, setMovie] = useState(null)

	// const formatResearch = () => {
	// 	return research
	// 		.toLowerCase()
	// 		.replace(/\s+/g, '_')
	// }

	// const searchMusic = () => {
	// 	if (research) {
	// 		OMBdAPI.getMovieByName(formatResearch(research))
	// 			.then(res => {
	// 				if (res.data.Response === 'True') {
	// 					console.log(res.data.Released)
	// 					setMovie({
	// 						imdbLink: `https://www.imdb.com/title/${res.data.imdbID}`,
	// 						posterURI: res.data.Poster,
	// 						title: res.data.Title,
	// 						director : res.data.Director,
	// 						rating: Math.round(Number.parseFloat(res.data.imdbRating) / 2),
	// 						releaseDate: res.data.Released !== 'N/A' ? new Date(res.data.Released) : null,
	// 						summary: res.data.Plot
	// 					})
	// 				}
	// 				else {
	// 					setMovie(null)
	// 				}
	// 			})
	// 	}
	// }

	// return (
	// 	<ScrollView style={styles.container}>
	// 		<TextInput
	// 			style={styles.input}
	// 			placeholder="Recherche"
	// 			onChangeText={setResearch}
	// 			onEndEditing={searchMusic}
	// 			value={research}
	// 		/>
	// 		{movie ?
	// 			<View style={styles.movie}>
	// 				<View style={styles.posterContainer}>
	// 					<Image style={styles.poster} source={{ uri: movie.posterURI }}/>
	// 				</View>

	// 				<Text style={styles.title}>{ movie.title }</Text>
	// 				<Text style={styles.director}>{ movie.director }</Text>
	// 				<View style={styles.ratingWrapper}>
	// 					<RatingView
	// 						iconSize={30}
	// 						value={movie.rating}
	// 					/>
	// 				</View>

	// 				{movie.releaseDate &&
	// 					<Text style={styles.date}>Sorti le { movie.releaseDate.toLocaleDateString() }</Text>
	// 				}

	// 				<Text style={styles.summary}>{ movie.summary }</Text>

	// 				<View style={styles.controlsContainer}>
	// 					<CustomButton
	// 						label="Ajouter à ma liste"
	// 						onPress={() => navigation.navigate('CreateMovie', {
	// 							movie: null,
	// 							defaults: {
	// 								title: movie.title,
	// 								posterURI: movie.posterURI,
	// 								releaseDate: movie.releaseDate ? movie.releaseDate.toISOString() : null,
	// 								summary: movie.summary,
	// 								rating: movie.rating,
	// 								imdbLink: movie.imdbLink
	// 							}
	// 						})}
	// 					/>
	// 				</View>
	// 			</View>
	// 			:
	// 			<Text style={styles.noResults}>Aucun résultat</Text>
	// 		}
	// 	</ScrollView>
	// )

	return <View></View>
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},

	input: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 20,
		paddingVertical: 18,
		fontSize: 18,
		marginTop: 20
	},

	movie: {
		marginTop: 20
	},

	posterContainer: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#999999'
	},

	poster: {
		width: 130,
		height: 200
	},

	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 5
	},

	director: {
		fontSize: 18,
		color: '#999999'
	},

	ratingWrapper: {
		width: '45%'
	},

	date: {
		fontSize: 16,
		fontStyle: 'italic'
	},

	summary: {
		fontSize: 16,
		marginTop: 20
	},

	noResults: {
		fontSize: 20,
		textAlign: 'center',
		marginTop: 50
	},

	controlsContainer: {
		display: 'flex',
		alignItems: 'center',
		marginVertical: 20
	}
})

export default SearchSong