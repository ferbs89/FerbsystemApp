import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export default function BackButton({ navigation }) {
	return (
		<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
			<View style={styles.drawerButton}>
				<Icon name="arrow-left" size={24} color="#FFF" />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	drawerButton: {
		marginTop: 2,
		padding: 16,
	},
});
