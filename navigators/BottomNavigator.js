import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import MyMusic from '../screens/MyMusic'
import SearchMusic from '../screens/SearchMusic'

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === 'MyMusic') {
						iconName = 'music-note'
					} else if (route.name === 'SearchMusic') {
						iconName = 'search'
					}

					return <Icon name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: 'black',
				inactiveTintColor: 'gray',
			}}>
			<Tab.Screen
				name="MyMusic"
				component={MyMusic}
				options={{ title: 'Ma musique' }}
			/>
			<Tab.Screen
				name="SearchMusic"
				component={SearchMusic}
				options={{ title: 'Recherche iTunes' }}
			/>
		</Tab.Navigator>
	);
}
export default BottomNavigator