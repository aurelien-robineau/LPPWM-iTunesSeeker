import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'

const RatingView = ({ iconSize, value = 0 }) => {
	return (
		<View style={styles.ratingContainer}>
			<Icon
				name="star"
				size={iconSize}
				color="#ffd621"
				style={{ opacity: value >= 1 ? 1 : 0.3 }}
			/>
			<Icon
				name="star"
				size={iconSize}
				color="#ffd621"
				style={{ opacity: value >= 2 ? 1 : 0.3 }}
			/>
			<Icon
				name="star"
				size={iconSize}
				color="#ffd621"
				style={{ opacity: value >= 3 ? 1 : 0.3 }}
			/>
			<Icon
				name="star"
				size={iconSize}
				color="#ffd621"
				style={{ opacity: value >= 4 ? 1 : 0.3 }}
			/>
			<Icon
				name="star"
				size={iconSize}
				color="#ffd621"
				style={{ opacity: value >= 5 ? 1 : 0.3 }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	ratingContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
})

export default RatingView