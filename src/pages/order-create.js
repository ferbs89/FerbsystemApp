import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import BackButton from '../components/BackButton';
import TabNavigator from '../components/TabNavigator';
import Icon from 'react-native-vector-icons/Feather';

export default function OrderCreate(props) {
	const [stock, setStock] = useState(props?.route?.params?.stock);
	const [date, setDate] = useState('');
	const [qty, setQty] = useState('');
	const [price, setPrice] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<BackButton navigation={props.navigation} />

				<Text style={styles.headerTitle}>Nova operação</Text>

				<RectButton style={styles.headerButton} onPress={() => props.navigation.goBack()}>
					<Icon name="check" size={24} color="#ffffff" />
				</RectButton>				
			</View>

			<ScrollView>
				<View style={styles.content}>
					<Text style={styles.labelInput}>Ativo</Text>

					<TextInput
						style={styles.textInput}
						value={stock}
						onChangeText={setStock}
						autoCapitalize="characters"
					/>

					<Text style={styles.labelInput}>Data</Text>

					<TextInput
						style={styles.textInput}
						value={date}
						onChangeText={setDate}
					/>

					<Text style={styles.labelInput}>Quantidade</Text>

					<TextInput
						style={styles.textInput}
						keyboardType="numeric"
						value={qty}
						onChangeText={setQty}
					/>

					<Text style={styles.labelInput}>Preço</Text>

					<TextInput
						style={styles.textInput}
						keyboardType="numeric"
						value={price}
						onChangeText={setPrice}
					/>
				</View>
			</ScrollView>

			<TabNavigator navigation={props.navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f9fafa',
	},

	content: {
		flex: 1,
		padding: 16,
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: '#17496E',
	},

	headerTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ffffff',
	},

	headerButton: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#143E5E',
		borderRadius: 20,
	},

	labelInput: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#737380',
		marginBottom: 4,
	},

	textInput: {
		alignSelf: 'stretch',
		paddingVertical: 0,
		paddingHorizontal: 16,
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: '#dcdce6',
		height: 48,
		borderRadius: 8,
		marginBottom: 16,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#17496E',
	},

	button: {
		height: 48,
		borderRadius: 8,
		backgroundColor: '#17496E',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	},

	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 15,
	},
});
