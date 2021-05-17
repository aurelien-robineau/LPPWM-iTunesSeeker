import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const RatingInput = ({ iconSize, onChange, value = 0, disabled = false }) => {
	const [rating, setRating] = useState(value)

	const handleClick = (value) => {
		if (!disabled) {
			setRating(value)
			if (typeof onChange === 'function')
				onChange(value)
		}
	}

	useEffect(() => {
		setRating(value)
	}, [value])

	return (
		<View style={styles.ratingContainer}>
			<TouchableOpacity
				activeOpacity={disabled ? 1 : 0.5}
				onPress={() => handleClick(1)}
			>
				<Icon
					name="star"
					size={iconSize}
					color="#ffd621"
					style={{ opacity: rating >= 1 ? 1 : 0.3 }}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={disabled ? 1 : 0.5}
				onPress={() => handleClick(2)}
			>
				<Icon
					name="star"
					size={iconSize}
					color="#ffd621"
					style={{ opacity: rating >= 2 ? 1 : 0.3 }}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={disabled ? 1 : 0.5}
				onPress={() => handleClick(3)}
			>
				<Icon
					name="star"
					size={iconSize}
					color="#ffd621"
					style={{ opacity: rating >= 3 ? 1 : 0.3 }}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={disabled ? 1 : 0.5}
				onPress={() => handleClick(4)}
			>
				<Icon
					name="star"
					size={iconSize}
					color="#ffd621"
					style={{ opacity: rating >= 4 ? 1 : 0.3 }}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={disabled ? 1 : 0.5}
				onPress={() => handleClick(5)}
			>
				<Icon
					name="star"
					size={iconSize}
					color="#ffd621"
					style={{ opacity: rating >= 5 ? 1 : 0.3 }}
				/>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	ratingContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
})

export default RatingInput