import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import RatingView from './RatingView'

const SongCard = ({ song, onPress, isSearchResult = false }) => {
  return (
		<TouchableOpacity
			style={styles.card}
			// onPress={() => onPress(song.id)}
		>
			<Image style={styles.image} source={{ uri: song.artworkURL }}/>
			<View style={styles.songInfo}>
				<Text style={styles.title}>{ song.title }</Text>
				<Text style={styles.artist}>{ song.artist }</Text>
				{ !isSearchResult &&
					<View style={styles.ratingContainer}>
						<RatingView iconSize={30} value={song.rating} />
					</View>
				}
			</View>
		</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		backgroundColor: 'white',
		marginVertical: 5,
		marginHorizontal: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},

	image: {
		height: '100%',
		minHeight: 85,
		width: 85
	},

	songInfo: {
		marginLeft: 15,
		width: '70%'
	},

	title: {
		fontSize: 20
	},

	artist: {
		fontSize: 18,
		color: '#858585'
	},

	ratingContainer: {
		width: '60%'
	},

	rating: {
		fontSize: 16
	}
})

export default SongCard