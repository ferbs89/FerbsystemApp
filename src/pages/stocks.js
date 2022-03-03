import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useQuery } from 'react-query';

import { api } from '../services/api';

import Loading from '../components/Loading';
import Error from '../components/Error';
import Stock from '../components/Stock';
import TabNavigator from '../components/TabNavigator';

export default function Stocks({ navigation }) {
	const [refreshing, setRefreshing] = useState(false);

	const { data: stocks, isLoading, refetch, error } = useQuery('stocks', async () => {
		const response = await api.get('/stocks');
		return response.data.stocks;
	}, {
		staleTime: 1000 * 60 * 10, // 10 minutes
	});

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

	function renderEmpty() {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>Cadastre suas operações para acompanhar a evolução de sua carteira.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{isLoading ? (
				<Loading />

			) : error ? (
				<Error />
			
			) : (
				<FlatList
					data={stocks}
					keyExtractor={item => item._id}
					renderItem={renderItem}
					ListHeaderComponent={renderHeader}
					ListFooterComponent={renderFooter}
					ListEmptyComponent={renderEmpty}
					onRefresh={refetch}
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

	emptyContainer: {
		paddingTop: 16,
		paddingHorizontal: 16,
	},

	emptyText: {
		lineHeight: 24,
	},
});
