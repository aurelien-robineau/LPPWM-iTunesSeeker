import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet, FlatList, SafeAreaView, Text, View, StatusBar, Dimensions } from 'react-native'
import { Picker } from '@react-native-community/picker'
import SongCard from '../components/SongCard'
import Song from '../models/Song'

const MyMusic = ({ navigation }) => {
	const [songs, setSongs] = useState([])
	const [songsToDisplay, setSongsToDisplay] = useState([])
	const [research, setResearch] = useState(null)

	useEffect(() => {
		loadSongs()
	}, [])

	useEffect(() => {
		const focus = navigation.addListener('focus', () => {
			loadSongs()
		})

		return focus
	}, [navigation])

	const loadSongs = async () => {
		const userSongs = (await Song.getAllForCurrentUser()).sort((a, b) => a.id < b.id)
		setSongs(userSongs)
		setSongsToDisplay([...userSongs])
	}

	const formatResearch = (research) => {
		return research
			.toLowerCase()
			.replace(/\s+/g, '_')
	}

	const searchSong = (text) => {
		setResearch(text)
		if (text) {
			const formattedResearch = formatResearch(text)
			const matchingSongs = []
			songs.forEach(song => {
				if (formatResearch(song.title).includes(formattedResearch)) {
					matchingSongs.push(song)
				}
			})

			setSongsToDisplay([...matchingSongs])
		}
		else {
			setSongsToDisplay(songs)
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
		<View style={styles.heightAuto}>
			{ songs.length ?
				<View style={styles.heightAuto}>
					<TextInput
						style={styles.input}
						placeholder="Recherche"
						onChangeText={searchSong}
						value={research}
					/>
					{songsToDisplay.length ?
						<SafeAreaView style={[styles.listContainer, styles.heightAuto]}>
							<FlatList
								data={songsToDisplay}
								renderItem={renderSong}
								keyExtractor={item => item.id.toString()}
							/>
						</SafeAreaView>
						:
						<View style={styles.noSongsContainer}>
							<Text style={styles.noSongsText}>
								Aucun résultat
							</Text>
						</View>
					}
				</View>
				:
				<View style={styles.noSongsContainer}>
					<Text style={styles.noSongsText}>
						Pas de musique par ici...
					</Text>
				</View>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	heightAuto: {
		height: '100%',
		minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
	},

	input: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 20,
		paddingVertical: 18,
		fontSize: 18,
		marginTop: 10,
		marginHorizontal: 10
	},

	listContainer: {
		paddingBottom: 140,
		paddingTop: 5,
		paddingHorizontal: 8
	},

	noSongsContainer: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 50
	},

	noSongsText: {
		fontSize: 18
	}
})

export default MyMusic