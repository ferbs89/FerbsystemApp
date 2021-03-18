import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, ScrollView } from 'react-native';

import BackButton from '../components/BackButton';
import TabNavigator from '../components/TabNavigator';

export default function OrderCreate(props) {
	const [stock, setStock] = useState(props?.route?.params?.stock);
	const [date, setDate] = useState('');
	const [qty, setQty] = useState('');
	const [price, setPrice] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<BackButton navigation={props.navigation} />

				<View style={styles.headerTitle}>
					<Text style={styles.headerTitleText}>Nova operação</Text>
				</View>
			</View>

			<ScrollView style={{flex: 1, backgroundColor: '#eef6fb', borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
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
						value={qty}
						onChangeText={setQty}
						keyboardType="numeric"
					/>

					<Text style={styles.labelInput}>Preço</Text>

					<TextInput
						style={styles.textInput}
						value={price}
						onChangeText={setPrice}
						keyboardType="numeric"
					/>

					<TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Salvar</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</ScrollView>

			<TabNavigator navigation={props.navigation} />
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
		justifyContent: 'space-between',
		backgroundColor: '#17496E',
		height: 56,
	},

	headerTitle: {
		flex: 1,
	},

	headerTitleText: {
		fontSize: 20,
		color: '#FFF',
	},

	headerRight: {
		flexDirection: 'row',
	},

	headerRightIcon: {
		padding: 16,
	},

	content: {
		padding: 16,
	},

	labelInput: {
		fontSize: 16,
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
		fontSize: 16,
	},
});
