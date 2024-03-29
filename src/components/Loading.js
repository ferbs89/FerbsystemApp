import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Loading() {
	return (
        <View style={styles.container}>
            <ActivityIndicator color="#17496E" size="large" />
        </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f9fafa',
	},
});
