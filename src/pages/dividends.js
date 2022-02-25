import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';

import axios from 'axios';
import { formatMoney, formatDateDMY } from '../utils/functions';

import Loading from '../components/Loading';
import TabNavigator from '../components/TabNavigator';

export default function Dividends({ navigation }) {
	const [dividends, setDividends] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchData();
		});

		return unsubscribe;
	}, [navigation]);

	async function fetchData() {
		await axios.get('https://ferbsystem.vercel.app/api/dividends')
		.then(response => {
			setDividends(response.data);
			setLoading(false);

		}).catch(error => {
			setDividends([]);
			setLoading(false);
		});
	}

	function renderHeader() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Dividendos</Text>
			</View>
		);
	}

	function renderItem({ item }) {
		return (
			// <TouchableWithoutFeedback onPress={() => navigation.push('OrderEdit', {order: item})}>
				<View style={styles.itemContainer}>
					<View style={styles.headerContainer}>
						<View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', }}>
							<Text style={styles.textHeader}>{item.stock}</Text>
						</View>

						<View style={{flex: 1, alignItems: 'center', }}>
							<Text style={styles.textTitle}>Data com</Text>
							<Text style={styles.textHeader}>{formatDateDMY(item.dateWith)}</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', }}>
							<Text style={styles.textTitle}>Data pagto</Text>
							<Text style={styles.textHeader}>{formatDateDMY(item.datePay)}</Text>
						</View>
					</View>				
					
					<View style={{ flexDirection: 'row', padding: 8, }}>
						<View style={{flex: 1, alignItems: 'flex-start', }}>
							<Text style={styles.textTitle}>Valor</Text>
							<Text style={styles.textData}>R$ {formatMoney(item.price)}</Text>
						</View>

						<View style={{flex: 1, alignItems: 'center', }}>
							<Text style={styles.textTitle}>Qtde</Text>
							<Text style={styles.textData}>{item.qty}</Text>
						</View>					

						<View style={{flex: 1, alignItems: 'flex-end', }}>
							<Text style={styles.textTitle}>Total</Text>
							<Text style={styles.textData}>R$ {formatMoney(item.qty * item.price)}</Text>
						</View>
					</View>
				</View>
			// </TouchableWithoutFeedback>
		);
	}

	function renderFooter() {
		return (
			<View style={{ marginBottom: 16 }} />
		);
	}

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<View style={styles.content}>
					<FlatList
						data={dividends}
						keyExtractor={item => item._id.toString()}
						renderItem={renderItem}
						ListHeaderComponent={renderHeader}
						ListFooterComponent={renderFooter}
						onRefresh={fetchData}
						refreshing={refreshing}
					/>
				</View>
			)}

			<TabNavigator navigation={navigation} />
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
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 16,
		paddingHorizontal: 16,
	},

	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#05111a',
	},

	itemContainer: {
		backgroundColor: '#FFF',
		marginHorizontal: 16,
		marginTop: 16,
		borderWidth: 1,
		borderColor: '#d3dada',
		borderRadius: 4,
	},

	headerContainer: {
		flexDirection: 'row', 
		// justifyContent: 'space-between', 
		padding: 8, 
		backgroundColor: '#e6eaea',
		borderTopLeftRadius: 4, 
		borderTopRightRadius: 4, 
		borderBottomWidth: 1, 
		borderBottomColor: '#d3dada',
	},

	textHeader: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#17496E',
	},

	textTitle: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#737380',
	},

	textData: {
		fontSize: 15,
	},
});
