import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useQuery } from 'react-query';

import { api } from '../services/api';
import { formatMoney, formatDateDMY } from '../utils/functions';

import Loading from '../components/Loading';
import TabNavigator from '../components/TabNavigator';

export default function Orders({ navigation }) {
	const [refreshing, setRefreshing] = useState(false);

	const { data: orders, isLoading, refetch } = useQuery('orders', async () => {
		const response = await api.get('/orders');
		return response.data.orders;
	}, {
		staleTime: 1000 * 60 * 10, // 10 minutes
	});

	function renderHeader() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Operações</Text>
			</View>
		);
	}

	function renderItem({ item }) {
		const profit = (item.qty < 0 ) ? (Math.abs(item.qty) * item.price) - (Math.abs(item.qty) * item.avg_price) : (0);

		return (
			<TouchableWithoutFeedback onPress={() => navigation.push('OrderEdit', {order: item})}>
				<View style={styles.itemContainer}>
					<View style={styles.headerContainer}>
						<Text style={styles.textHeader}>{item.stock}</Text>
						<Text style={styles.textHeader}>{formatDateDMY(item.date)}</Text>
					</View>				
					
					<View style={{ flexDirection: 'row', padding: 8, }}>
						<View style={{flex: 1, alignItems: 'flex-start'}}>
							<Text style={styles.textTitle}>Preço</Text>
							<Text style={styles.textData}>R$ {formatMoney(item.price)}</Text>
						</View>

						<View style={{flex: 1, alignItems: 'center'}}>
							<Text style={styles.textTitle}>Qtde</Text>
							<Text style={styles.textData}>{item.qty}</Text>
						</View>					

						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<Text style={styles.textTitle}>Total</Text>
							<Text style={styles.textData}>R$ {formatMoney(item.qty * item.price)}</Text>
						</View>
					</View>

					{profit != 0 && (
						<View style={styles.profitContainer}>
							{profit > 0 && (
								<Text style={styles.textProfitPositive}>Lucro: R$ {formatMoney(profit)}</Text>
							)}

							{profit < 0 && (
								<Text style={styles.textProfitNegative}>Lucro: R$ {formatMoney(profit)}</Text>
							)}
						</View>
					)}
				</View>
			</TouchableWithoutFeedback>
		);
	}

	function renderFooter() {
		return (
			<View style={{ marginBottom: 16 }} />
		);
	}
	
	return (
		<View style={styles.container}>
			{isLoading ? (
				<Loading />
			) : (
				<FlatList
					data={orders}
					keyExtractor={item => item._id.toString()}
					renderItem={renderItem}
					ListHeaderComponent={renderHeader}
					ListFooterComponent={renderFooter}
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
		justifyContent: 'space-between', 
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

	profitContainer: {
		alignItems: 'center',
		marginBottom: 8,
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
