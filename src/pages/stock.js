import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import axios from 'axios';
import { formatMoney, formatDate } from '../utils/functions';

import BackButton from '../components/BackButton';
import Loading from '../components/Loading';

export default function Stock(props) {
	const stock = props.route.params.stock;
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		await axios.get(`https://ferbsystem.vercel.app/api/orders?stock=${stock}`)
		.then(response => {
			setOrders(response.data.orders);
			setLoading(false);

		}).catch(error => {
			setOrders([]);
			setLoading(false);
		});
	}

	function renderItem({ item }) {
		return (
			<View style={styles.itemContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.textStock}>{item.stock}</Text>
					<Text style={styles.textDate}>{formatDate(item.date)}</Text>
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
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<BackButton navigation={props.navigation} />
				<Text style={styles.headerTitle}>{stock}</Text>
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
