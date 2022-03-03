import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Error() {
	return (
        <View style={styles.container}>
            <Text style={styles.error}>Ocorreu um erro ao carregar os dados.</Text>
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

    error: {
        fontWeight: 'bold',
        color: '#FF0000',
    }
});
