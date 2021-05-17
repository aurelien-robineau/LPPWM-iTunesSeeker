import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import CustomButton from '../components/CustomButton'
import User from '../models/User'

const Settings = ({ navigation }) => {
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		loadUser()
	}, [])

	const loadUser = async () => {
		setUser(await User.getCurrentUser())
	}

	const logout = async ()  => {
		await User.logout()
	}

	return user && (
		<View style={styles.container}>
			<View style={styles.infoGroup}>
				<Text style={styles.label}>Nom d'utilisateur</Text>
				<Text style={styles.value}>{user.username}</Text>
			</View>

			<View style={styles.controlsContainer}>
				<CustomButton 
					label="Déconnexion"
					onPress={logout}
					style={{ width: '100%' }}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},

	infoGroup: {
		marginTop: 30
	},

	label: {
		fontSize: 18,
		color: '#666666'
	},

	value: {
		fontSize: 20,
		color: 'black'
	},

	controlsContainer: {
		display: 'flex',
		alignItems: 'center'
	}
})

export default Settings