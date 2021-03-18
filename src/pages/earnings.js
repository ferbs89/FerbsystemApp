import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TabNavigator from '../components/TabNavigator';

export default function Earnings({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Proventos</Text>
			</View>

			<View style={styles.content}>

			</View>

			<TabNavigator navigation={navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#17496E',
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#17496E',
		height: 56,
	},

	headerTitle: {
		marginLeft: 16,
		fontSize: 20,
		color: '#FFF',
	},

	content: {
		flex: 1,
		backgroundColor: '#eef6fb',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},

	itemContainer: {
		backgroundColor: '#FFF',
		marginHorizontal: 16,
		marginTop: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: '#dcdce6',
		borderRadius: 8,
	},

	headerContainer: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center',
		borderBottomWidth: 1, 
		borderBottomColor: '#dcdce6', 
		paddingBottom: 8, 
		marginBottom: 8,
	},

	textStock: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#17496E',
	},

	textDate: {
		fontWeight: 'bold',
		color: '#17496E',
	},

	textTitle: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#737380',
	},

	textData: {
		fontSize: 16,
	},
});
