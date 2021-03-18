import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';

import axios from 'axios';
import { formatMoney, formatDateDMY } from '../utils/functions';

import Loading from '../components/Loading';
import TabNavigator from '../components/TabNavigator';
import Icon from 'react-native-vector-icons/Feather';

export default function Orders({ navigation }) {
	const [orders, setOrders] = useState([]);
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
		await axios.get('https://ferbsystem.vercel.app/api/orders')
		.then(response => {
			setOrders(response.data.orders);
			setLoading(false);

		}).catch(error => {
			setOrders([]);
			setLoading(false);
		});
	}

	function renderItem({ item }) {
		const profit = (item.qty < 0 ) ? (Math.abs(item.qty) * item.price) - (Math.abs(item.qty) * item.avg_price) : (0);

		return (
			<TouchableWithoutFeedback onPress={() => navigation.push('OrderEdit', {order: item})}>
				<View style={styles.itemContainer}>
					<View style={styles.itemHeaderContainer}>
						<Text style={styles.textStock}>{item.stock}</Text>
						<Text style={styles.textDate}>{formatDateDMY(item.date)}</Text>
					</View>				
					
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1, alignItems: 'flex-start'}}>
							<Text style={styles.textTitle}>Preço</Text>
							<Text style={styles.textData}>R$ {formatMoney(item.price)}</Text>
						</View>

						<View style={{flex: 1, alignItems: 'center'}}>
							<Text style={styles.textTitle}>Qtde.</Text>
							<Text style={styles.textData}>{item.qty}</Text>
						</View>					

						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<Text style={styles.textTitle}>Total</Text>
							<Text style={styles.textData}>R$ {formatMoney(item.qty * item.price)}</Text>
						</View>
					</View>

					<View style={styles.profitContainer}>
						{profit > 0 && (
							<Text style={styles.textProfitPositive}>Lucro: R$ {formatMoney(profit)}</Text>
						)}

						{profit < 0 && (
							<Text style={styles.textProfitNegative}>Lucro: R$ {formatMoney(profit)}</Text>
						)}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
	
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerTitle}>
					<Text style={styles.headerTitleText}>Operações</Text>
				</View>

				<View style={styles.headerRight}>
					<TouchableWithoutFeedback onPress={() => {navigation.push('OrderCreate')}}>
						<View style={styles.headerRightIcon}>
							<Icon name="plus-circle" size={24} color="#FFF" />
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>

			{loading ? (
				<Loading />
			) : (
				<View style={styles.content}>
					<FlatList
						data={orders}
						keyExtractor={item => item._id.toString()}
						renderItem={renderItem}
						ListFooterComponent={() => <View style={{marginBottom: 16}}></View>}
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
		marginLeft: 16,
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

	itemHeaderContainer: {
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

	profitContainer: {
		alignItems: 'flex-end',
	},

	textProfitPositive: {
		fontSize: 13,
		fontWeight: 'bold',
		color: 'green',
	},

	textProfitNegative: {
		fontSize: 13,
		fontWeight: 'bold',
		color: 'red',
	},
});
