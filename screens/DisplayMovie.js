import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'

import CustomButton from '../components/CustomButton'
import RatingView from '../components/RatingView'
import Movie from '../models/Movie'

const DisplayMovie = ({ navigation, route }) => {
	const [movie, setMovie] = useState(null)
	
	useEffect(() => {
		if (route.params?.id)
			loadMovie()
	}, [route.params?.id])

	const loadMovie = async () => {
		setMovie(await Movie.getById(route.params.id))
	}

	const deleteMovie = async () => {
		await Movie.deleteById(movie.id)
		navigation.navigate('Home')
	}

	const editMovie = () => {
		if (movie)
			navigation.navigate('CreateMovie', { movie })
	}

	if (route.params?.id) {
		return movie && (
			<ScrollView>
				<Image style={styles.poster} source={{ uri: movie.posterURI }} />

				<View style={styles.container}>
					<Text style={styles.title}>{ movie.title }</Text>
					<View style={styles.ratingWrapper}>
						<RatingView iconSize={30} value={movie.rating} />
					</View>
					{movie.releaseDate &&
						<Text style={styles.releaseDate}>Sorti le { movie.releaseDate.toLocaleDateString() }</Text>
					}

					<Text style={styles.value}>{ movie.summary }</Text>

					{movie.comments &&
						<>
							<Text style={styles.label}>Mes commentaires</Text>
							<Text style={styles.value}>{ movie.comments }</Text>
						</>
					}

					{movie.imdbLink &&
						<>
							<Text style={styles.label}>Lien IMDB</Text>
							<Text style={styles.value}>{ movie.imdbLink }</Text>
						</>
					}

					<View style={styles.controlsContainer}>
						<CustomButton
							label="Modifier"
							onPress={editMovie}
						/>

						<CustomButton
							label="Supprimer"
							onPress={deleteMovie}
							style={{ backgroundColor: '#ff4a4a' }}
						/>
					</View>
				</View>
			</ScrollView>
		)
	}
	else {
		return (
			<View>
				<Text style={styles.noMovie}>Pas de film sélectionné</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10
	},

	ratingWrapper: {
		maxWidth: '45%',
		marginBottom: 10
	},

	poster: {
		width: '100%',
		height: 225
	},

	title: {
		fontSize: 24,
		marginTop: 10,
		fontWeight: 'bold'
	},

	releaseDate: {
		fontSize: 16,
		fontStyle: 'italic'
	},

	label: {
		fontSize: 20,
		marginTop: 20
	},

	value: {
		fontSize: 18,
		marginTop: 5
	},

	controlsContainer: {
		display: 'flex',
		alignItems: 'center',
		margin: 20
	},

	noMovie: {
		fontSize: 20,
		textAlign: 'center',
		marginTop: 50
	}
})

export default DisplayMovie