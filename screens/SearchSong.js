import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, SafeAreaView, FlatList } from 'react-native'

import SongCard from '../components/SongCard'
import Song from '../models/Song'
import User from '../models/User'
import iTunesAPI from '../services/iTunesAPI'

const SearchSong = ({ navigation }) => {
	const [research, setResearch] = useState(null)
	const [songs, setSongs] = useState(null)

	const formatResearch = () => {
		return encodeURIComponent(research)
	}

	const searchSongs = async () => {
		if (research) {
			const user = await User.getCurrentUser()
			iTunesAPI.searchSongs(formatResearch(research))
				.then(res => {
					setSongs(res.data.results.map(song => new Song(
						song.trackId,
						song.trackName,
						song.collectionName,
						song.artistName,
						Math.round(song.trackTimeMillis / 1000),
						song.artworkUrl100,
						song.releaseDate
					)))
				})
		}
	}
	
	const renderSong = ({ item }) => {
		return (
			<SongCard
				song={item}
				onPress={() => navigation.navigate('DisplaySong', { song: item })}
			/>
		)
	}

	return (
		<>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="Recherche"
					onChangeText={setResearch}
					onEndEditing={searchSongs}
					value={research}
				/>
			</View>
			<SafeAreaView>
				{songs ?
					songs.length !== 0 ?
						<FlatList
							style={styles.list}
							data={songs}
							renderItem={renderSong}
							keyExtractor={item => item.id.toString()}
						/>
						:
						<View style={styles.container}>
							<Text style={styles.noResults}>Aucun résultat</Text>
						</View>
					:
					<View style={styles.container}>
						<Text style={styles.noResults}>Les résultats de la recherche s'afficheront ici</Text>
					</View>
				}
			</SafeAreaView>
		</>
	)
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
		marginTop: 20,
		marginBottom: 20
	},

	list: {
		paddingHorizontal: 20,
		marginBottom: 110
	},

	noResults: {
		textAlign: 'center',
		marginTop: 50,
		fontSize: 20
	}
})

export default SearchSong