import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export default function DrawerButton({ navigation }) {
	return (
		<TouchableWithoutFeedback onPress={navigation.openDrawer}>
			<View style={styles.drawerButton}>
				<Icon name="menu" size={24} color="#FFF" />
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
