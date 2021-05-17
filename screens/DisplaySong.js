import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'

import CustomButton from '../components/CustomButton'
import RatingView from '../components/RatingView'
import Song from '../models/Song'

const DisplaySong = ({ navigation, route }) => {
	const [song, setSong] = useState(null)
	const [isSaved, setIsSaved] = useState(null)
	
	useEffect(() => {
		initSong()
	}, [route.params.song])

	const initSong = async () => {
		const localSong = await Song.getById(route.params.song.id)
		setSong(route.params.song)
		setIsSaved(localSong !== null)
	}

	const addToMyList = () => {
		if (song) {
			song.save()
			setIsSaved(true)
		}
	}

	const removeFromMyList = () => {
		if (song) {
			Song.deleteById(song.id)
			setIsSaved(false)
		}
	}

	const formatDuration = (secondsTotal) => {
		const minutes = Math.floor(secondsTotal / 60)
		const seconds = secondsTotal - (minutes * 60)

		const minutesString = `${minutes}`
		const secondsString = `${seconds}`

		const secondsFormatted = secondsString.length === 1 ? `0${seconds}` : secondsString

		return `${minutesString}:${secondsFormatted}`
	}

	return song && (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.artworkContainer}>
					<Image style={styles.artwork} source={{ uri: song.artworkURL }} />
				</View>

				<Text style={styles.title}>{ song.title }</Text>
				<Text style={styles.artist}>{ song.artist }</Text>

				<View style={styles.details}>
					<Text style={styles.label}>Album</Text>
					<Text style={styles.value}>{ song.album }</Text>

					<Text style={styles.label}>Durée</Text>
					<Text style={styles.value}>{ formatDuration(song.duration) }</Text>

					<Text style={styles.label}>Date de sortie</Text>
					<Text style={styles.value}>{ song.releaseDate.toLocaleDateString() }</Text>
				</View>


				<View style={styles.controlsContainer}>
					{isSaved ?
						<CustomButton
							label="Retirer de ma liste"
							onPress={removeFromMyList}
							style={{ backgroundColor: '#ff4a4a' }}
						/>
						:
						<CustomButton
							label="Ajouter à ma liste"
							onPress={addToMyList}
						/>
					}
				</View>

								{/* <View style={styles.ratingWrapper}>
					<RatingView iconSize={30} value={song.rating} />
				</View> */}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10
	},

	ratingWrapper: {
		maxWidth: '45%',
		marginBottom: 10
	},

	artworkContainer: {
		display: 'flex',
		alignItems: 'center'
	},

	artwork: {
		width: 150,
		height: 150,
		marginTop: 30
	},

	title: {
		fontSize: 24,
		marginTop: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	},

	artist: {
		fontSize: 20,
		textAlign: 'center',
		color: '#858585'
	},

	details: {
		marginTop: 30
	}, 

	label: {
		fontSize: 16,
		color: '#858585',
		marginTop: 10
	},

	value: {
		fontSize: 20,
	},

	controlsContainer: {
		display: 'flex',
		alignItems: 'center',
		margin: 20
	}
})

export default DisplaySong