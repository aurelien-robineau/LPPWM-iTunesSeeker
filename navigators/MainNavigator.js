import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'

import DisplaySong from '../screens/DisplaySong'
import Settings from '../screens/Settings'
import BottomNavigator from './BottomNavigator'

const Stack = createStackNavigator();

const MainNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={BottomNavigator}
				options={({ navigation }) => ({
					title: 'iTunes Seeker',
					headerRight: () => (
						<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
							<Icon
								name="settings"
								size={24}
								color='black'
								style={{ marginRight: 20 }}
							/>
						</TouchableOpacity>
					)
				})}/>
			<Stack.Screen
				name="DisplaySong"
				component={DisplaySong}
				options={({ route }) => ({
					title: route.params.song.title,
				})}
			/>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{ title: 'Paramètres' }}
			/>
		</Stack.Navigator>
	);
}
export default MainNavigator