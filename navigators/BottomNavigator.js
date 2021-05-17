import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import MoviesList from '../screens/MoviesList'
import CreateMovie from '../screens/CreateMovie'
import DisplayMovie from '../screens/DisplayMovie'
import SearchMovie from './../screens/SearchMovie';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === 'Home') {
					iconName = 'bookmark'
					} else if (route.name === 'DisplayMovie') {
						iconName = 'movie'
					} else if (route.name === 'CreateMovie') {
						iconName = 'add'
					} else if (route.name === 'SearchMovie') {
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
				name="Home"
				component={MoviesList}
				options={{ title: 'Mes films' }}
			/>
			<Tab.Screen
				name="DisplayMovie"
				component={DisplayMovie}
				options={{ title: 'Film' }}
			/>
			<Tab.Screen
				name="CreateMovie"
				component={CreateMovie}
				options={{ title: 'Nouveau film' }}
			/>
			<Tab.Screen
				name="SearchMovie"
				component={SearchMovie}
				options={{ title: 'Recherche IMDB' }}
			/>
		</Tab.Navigator>
	);
}
export default BottomNavigator