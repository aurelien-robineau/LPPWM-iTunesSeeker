import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AuthNavigator from './navigators/AuthNavigator'
import MainNavigator from './navigators/MainNavigator';
import User from './models/User';

const Stack = createStackNavigator();

const App = () => {
	const [currentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		loadCurrentUser() 
	}, [])

	const loadCurrentUser = async () => {
		setCurrentUser(await User.getCurrentUser())
	}

	User.setOnLogout(loadCurrentUser)

	return (
		<NavigationContainer>
			{currentUser
				? <MainNavigator />
				: <AuthNavigator onAuthSucceeded={loadCurrentUser} />
			}
		</NavigationContainer>
	);
}
export default App