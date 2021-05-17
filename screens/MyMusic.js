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
	const [filter, setFilter] = useState('id')

	useEffect(() => {
		loadSongs()
	}, [])

	useEffect(() => {
		const focus = navigation.addListener('focus', () => {
			loadSongs()
		})

		return focus
	}, [navigation])

	useEffect(() => {
		setSongsToDisplay([...songsToDisplay.sort(songComparator)])
	}, [filter])

	const loadSongs = async () => {
		const userSongs = (await Song.getAllForCurrentUser()).sort((a, b) => a.id < b.id)
		setSongs(userSongs)
		setSongsToDisplay([...userSongs.sort(songComparator)])
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

			setSongsToDisplay([...matchingSongs.sort(songComparator)])
		}
		else {
			setSongsToDisplay(songs)
		}
	}

	const songComparator = (a, b) => {
		switch(filter) {
			case 'id':
				return a.id < b.id
			case 'title':
				return a.title > b.title
			case 'rating':
				if (a.rating !== b.rating)
					return a.rating < b.rating
				return a.id < b.id
			case 'releaseDate':
				const aDate = new Date(a.releaseDate)
				const bDate = new Date(b.releaseDate)
				if (aDate !== bDate)
					return new Date(a.releaseDate) < new Date(b.releaseDate)
				return a.id < b.id
			default:
				return a.id < b.id
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
					<View style={styles.filtersContainer}>
						<Text style={{ fontSize: 16 }}>Trier par : </Text>
						<Picker
							selectedValue={filter}
							style={{ width: 170 }}
							onValueChange={setFilter}
							mode="dropdown"
						>
							<Picker.Item label="Identifiant" value="id" />
							<Picker.Item label="Titre" value="title" />
							<Picker.Item label="Note" value="rating" />
							<Picker.Item label="Date de sortie" value="releaseDate" />
						</Picker>
					</View>

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

	filtersContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		marginTop: 10
	},

	listContainer: {
		paddingBottom: 195,
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