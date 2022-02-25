import React from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export default function BackButton({ navigation }) {
	return (
		<RectButton style={styles.drawerButton} onPress={() => navigation.goBack()}>
			<Icon name="arrow-left" size={24} color="#ffffff" />
		</RectButton>
	);
}

const styles = StyleSheet.create({
	drawerButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#143E5E',
	},
});
