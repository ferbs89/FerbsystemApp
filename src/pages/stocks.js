import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import axios from 'axios';

import Loading from '../components/Loading';
import Stock from '../components/Stock';
import TabNavigator from '../components/TabNavigator';

export default function Stocks({ navigation }) {
	const [stocks, setStocks] = useState([]);
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
		await axios.get('https://ferbsystem.vercel.app/api/stocks')
		.then(response => {
			setStocks(response.data.stocks);
			setLoading(false);

		}).catch(error => {
			setStocks([]);
			setLoading(false);
		});
	}

	function renderHeader() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Carteira</Text>
			</View>
		);
	}

	function renderItem({ item }) {
		return (
			<Stock item={item} navigation={navigation} />
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
				<FlatList
					data={stocks}
					keyExtractor={item => item._id}
					renderItem={renderItem}
					ListHeaderComponent={renderHeader}
					ListFooterComponent={renderFooter}
					onRefresh={fetchData}
					refreshing={refreshing}
				/>
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
});
