import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login'

const Stack = createStackNavigator();

const AuthNavigator = ({ onAuthSucceeded }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Login"
				component={Login}
				initialParams={{ onSuccess: onAuthSucceeded }}
				options={{ title: 'Connexion' }}
			/>
		</Stack.Navigator>
	)
}
export default AuthNavigator