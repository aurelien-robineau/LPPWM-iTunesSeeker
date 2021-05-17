import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity, Image, Keyboard } from 'react-native'
import { Icon } from 'react-native-elements'
import * as DocumentPicker from 'expo-document-picker'
import DateTimePicker from '@react-native-community/datetimepicker'

import CustomButton from '../components/CustomButton'
import Movie from '../models/Movie'
import RatingInput from '../components/RatingInput'
import User from '../models/User'

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const CreateMovie = ({ navigation, route }) => {
	let movie = route.params?.movie ?? null
	let defaults = route.params?.defaults ?? null

	const [title, setTitle] = useState(movie?.title ?? defaults?.title ?? null)
	const [poster, setPoster] = useState(movie?.posterURI ?? defaults?.posterURI ?? null)
	const [releaseDate, setReleaseDate] = useState(new Date(movie?.releaseDate ?? defaults?.releaseDate ?? new Date()))
	const [summary, setSummary] = useState(movie?.summary ?? defaults?.summary ?? null)
	const [comments, setComments] = useState(movie?.comments ?? defaults?.comments ?? null)
	const [rating, setRating] = useState(movie?.rating ?? defaults?.rating ?? 0)
	const [imdbLink, setImdbLink] = useState(movie?.imdbLink ?? defaults?.imdbLink ?? null)

	const [showDatePicker, setShowDatePicker] = useState(false)
	const [errors, setErrors] = useState({})
	
	useEffect(() => {
		const blur = navigation.addListener('blur', () => {
			resetForm()
		})

		return blur
	}, [navigation])

	useEffect(() => {
		movie = route.params?.movie ?? null
		defaults = route.params?.defaults ?? null
		setTitle(movie?.title ?? defaults?.title ?? null)
		setPoster(movie?.posterURI ?? defaults?.posterURI ?? null)
		setSummary(movie?.summary ?? defaults?.summary ?? null)
		setComments(movie?.comments ?? defaults?.comments ?? null)
		setRating(movie?.rating ?? defaults?.rating ?? 0)
		setImdbLink(movie?.imdbLink ?? defaults?.imdbLink ?? null)
		setErrors({})
	}, [route])

	const selectPoster = async () => {
		const res = await DocumentPicker.getDocumentAsync({
			type: 'image/*',
		})

		if (res.type === 'success') {
			setPoster(res.uri)
			removeError('poster')
		}
		else if (res.type !== 'cancel') {
			addErrors({ poster: "Impossible de charger l'image" })
		}
	}

	const saveMovie = async () => {
		const err = getFormErrors()

		if (Object.keys(err).length) {
			setErrors(getFormErrors())
			return
		}

		const user = await User.getCurrentUser()

		let newMovie = null
		if (!movie) {
			newMovie = new Movie(
				title,
				poster,
				releaseDate,
				summary,
				comments,
				rating,
				imdbLink,
				user.id
			)
		}
		else {
			movie.title = title
			movie.poster = poster
			movie.summary = summary
			movie.comments = comments
			movie.rating = rating
			movie.imdbLink = imdbLink
			newMovie = movie
		}

		await newMovie.save()
		navigation.navigate('DisplayMovie', { name: newMovie.title, id : newMovie.id })
	}

	const addErrors = (err) => {
		setErrors({...errors, ...err})
	}

	const removeError = (key) => {
		let newErrors = errors
		delete newErrors[key]

		setErrors(newErrors)
	}

	const getFormErrors = () => {
		const errors = {}
		const requiredData = { title, poster, summary, rating }
		
		for (let key in requiredData) {
			if (!requiredData[key])
				errors[key] = "Champs obligatoire"
		}

		if (imdbLink && !imdbLink.match(URL_REGEX))
			errors.imdbLink = 'Lien invalide'

		return errors
	}

	const resetForm = () => {
		movie = null
		defaults = null
		setTitle(null)
		setPoster(null)
		setSummary(null)
		setComments(null)
		setRating(0)
		setImdbLink(null)
		setErrors({})
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Titre</Text>
				<TextInput
					style={styles.input}
					onChangeText={setTitle}
					value={title}
				/>
				{errors.title && <Text style={styles.inputError}>{ errors.title }</Text>}
			</View>

			<View>
				<Text style={styles.label}>Affiche</Text>
				{poster ?
					<TouchableOpacity onPress={selectPoster}>
						<Image style={styles.poster} source={{ uri: poster }} />
					</TouchableOpacity>
					:
					<TouchableOpacity
						style={styles.fileInputButton}
						onPress={selectPoster}
					>
						<Icon name="description" color="black"/>
					</TouchableOpacity>
				}
				{errors.poster &&
					<Text style={styles.inputError}>{errors.poster}</Text>
				}
			</View>
			
			<View style={styles.formGroup}>
				<Text style={styles.label}>Date de sortie</Text>
				<TextInput
					style={styles.input}
					value={releaseDate.toLocaleDateString()}
					onFocus={() => setShowDatePicker(true)}
				/>
				{showDatePicker &&
					<DateTimePicker
						value={releaseDate}
						mode="date"
						is24Hour={true}
						display="default"
						onChange={(event, date) => {
							setShowDatePicker(false)
							Keyboard.dismiss()
							if (date) setReleaseDate(date)
						}}
					/>
				}
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Résumé</Text>
				<TextInput
					style={styles.input}
					onChangeText={setSummary}
					value={summary}
					numberOfLines={5}
					multiline
				/>
				{errors.summary && <Text style={styles.inputError}>{ errors.summary }</Text>}
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Commentaires</Text>
				<TextInput
					style={styles.input}
					onChangeText={setComments}
					value={comments}
					numberOfLines={3}
					multiline
				/>
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Note</Text>
				<RatingInput iconSize={45} onChange={setRating} value={rating}/>
				{errors.rating && <Text style={styles.inputError}>{ errors.rating }</Text>}
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Lien IMDB</Text>
				<TextInput
					style={styles.input}
					onChangeText={setImdbLink}
					value={imdbLink}
				/>
				{errors.imdbLink && <Text style={styles.inputError}>{ errors.imdbLink }</Text>}
			</View>

			<View style={styles.createButtonContainer}>
				<CustomButton
					label={movie ? 'Enregistrer' : 'Créer'}
					onPress={saveMovie}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25
	},

	formGroup: {
		marginTop: 15
	},

	label: {
		fontSize: 20,
		marginBottom: 5
	},

	input: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 20,
		paddingVertical: 18,
		fontSize: 18,
		marginBottom: 10
	},

	inputError: {
		fontSize: 16,
		color: 'red'
	},

	poster: {
		height: 200,
		width: '100%'
	},

	fileInputButton: {
		paddingHorizontal: 30,
		paddingVertical: 20,
		backgroundColor: 'white'
	},

	createButtonContainer: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 35
	}
})

export default CreateMovie