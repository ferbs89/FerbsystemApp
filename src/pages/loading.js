import React from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Loading() {
	return (
		<>
			<StatusBar backgroundColor="#17496E" barStyle="light-content" />
			
			<View style={styles.container}>
				<ActivityIndicator color="#FFF" size="large" />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#17496E',
	},
});
