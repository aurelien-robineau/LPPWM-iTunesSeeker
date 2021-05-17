import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import CustomButton from '../components/CustomButton'
import User from '../models/User'

const Login = ({ navigation, route }) => {
	const { onSuccess } = route.params

	const [action, setAction] = useState('login')
	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const login = async () => {
		setLoading(true)
		if (await validateForm()) {
			const success = await User.login(username, password)
			if (!success) {
				setError("Nom d'utilisateur ou mot de passe invalide")
				setLoading(false)
				return
			}

			onSuccess()
		}

		setLoading(false)
	}

	const register = async () => {
		setLoading(true)
		if (await validateForm()) {
			const user = new User(username, password)
			await user.save()

			const success = await User.login(username, password)
			if (!success) {
				setError("Nom d'utilisateur ou mot de passe invalide")
				setLoading(false)
				return
			}

			onSuccess()
		}

		setLoading(false)
	}

	const validateForm = async () => {
		if (!username || !password) {
			setError('Veuillez remplir tous les champs')
			return false
		}

		if (action === 'register' && password.length < 8) {
			setError('Le mot de passe de faire 8 caractère au minimum')
			return false
		}

		if (action === 'register' && !(await User.isUsernameAvailable(username))) {
			setError("Nom d'utilisateur déjà utilisé")
			return false
		}
		
		setError(null)
		return true
	}

	const switchAction = () => {
		setAction(action === 'login' ? 'register' : 'login')
		setUsername(null)
		setPassword(null)
		navigation.setOptions({ title: action === 'login' ? 'Inscription' : 'Connexion' })
	}

	return (
		<View style={styles.container}>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Nom d'utilisateur</Text>
				<TextInput
					style={styles.input}
					onChangeText={setUsername}
					value={username}
					textContentType="username"
				/>
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Mot de passe</Text>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					secureTextEntry={true}
					textContentType="password"
				/>
			</View>

			<View style={styles.submitButtonWrapper}>
				{error && <Text style={styles.error}>{ error }</Text>}

				<CustomButton 
					label={action === 'login' ? 'Se connecter' : "S'inscrire"}
					onPress={() => action === 'login' ? login() : register()}
					style={{ width: '100%' }}
					loading={loading}
				/>

				<CustomButton 
					label={action === 'login' ? 'Inscription' : 'Connexion'}
					onPress={switchAction}
					style={styles.switchActionButton}
					labelStyle={{ color: 'black' }}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 40
	},

	formGroup: {
		marginTop: 30
	},

	label: {
		fontSize: 20,
		marginBottom: 5
	},

	input: {
		backgroundColor: 'white',
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontSize: 20
	},

	submitButtonWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 30
	},

	switchActionButton: {
		width: '100%',
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: 'black'
	},

	error: {
		fontSize: 18,
		color: 'red',
		textAlign: 'center'
	}
})

export default Login