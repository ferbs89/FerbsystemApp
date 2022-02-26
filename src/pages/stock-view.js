import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';

import { api } from '../services/api';
import { formatMoney, formatDateDMY } from '../utils/functions';

import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import TabNavigator from '../components/TabNavigator';
import Icon from 'react-native-vector-icons/Feather';

export default function StockView(props) {
	const { params } = props.route;
	const [refreshing, setRefreshing] = useState(false);

	const { data, isLoading, refetch } = useQuery(['order', params.stock], async () => {
		const response = await api.get(`/orders?stock=${params.stock}`);
		return response.data;
	}, {
		staleTime: 1000 * 60 * 10, // 10 minutes
	});

	function renderHeader() {
		const { stock } = data;
		const profit = (stock.qty * stock.marketPrice) - stock.total;
		const profit_percent = (stock.marketPrice - stock.avg_price) / stock.avg_price * 100;

		return (
			<>
				<View style={styles.header}>
					<BackButton navigation={props.navigation} />

					<Text style={styles.headerTitle}>{params.stock} ({stock.marketChangePercent.toFixed(2).toString().replace('.', ',') + '%'})</Text>

					<RectButton style={styles.headerButton} onPress={() => { props.navigation.push('OrderCreate', {stock: params.stock}) }}>
						<Icon name="plus" size={24} color="#ffffff" />
					</RectButton>
				</View>

				<View style={[styles.itemContainer, styles.itemContent]}>
					<View style={{ paddingHorizontal: 8, }}>
						<View style={styles.detailContainer}>
							<Text style={styles.textTitle}>Intradia</Text>
							
							<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}>
									<Icon name="arrow-down" size={16} color="red" />
									<Text style={styles.textData}>R$ {formatMoney(stock.marketDayLow)}</Text>
								</View>

								<View style={{ flexDirection: 'row', alignItems: 'center', }}>
									<Icon name="arrow-up" size={16} color="green" />
									<Text style={styles.textData}>R$ {formatMoney(stock.marketDayHigh)}</Text>
								</View>
							</View>
						</View>

						<View style={styles.detailContainer}>
							<Text style={styles.textTitle}>Preço</Text>
							<Text style={styles.textData}>R$ {formatMoney(stock.marketPrice)}</Text>
						</View>

						<View style={styles.detailContainer}>
							<Text style={styles.textTitle}>Custo</Text>
							<Text style={styles.textData}>R$ {formatMoney(stock.avg_price)}</Text>
						</View>

						<View style={styles.detailContainer}>
							<Text style={styles.textTitle}>Quantidade</Text>
							<Text style={styles.textData}>{stock.qty}</Text>
						</View>

						<View style={styles.detailContainer}>
							<Text style={styles.textTitle}>Total</Text>
							<Text style={styles.textData}>R$ {formatMoney(stock.qty * stock.marketPrice)}</Text>
						</View>

						<View style={styles.detailContainer}>
							<Text style={styles.textTitle}>Lucro</Text>
							<Text style={profit > 0 ? styles.textPositive : styles.textNegative}>R$ {formatMoney(profit)}</Text>
						</View>

						<View style={styles.detailContainer}>
							<Text style={styles.textTitle}>Rentabilidade</Text>
							<Text style={profit_percent > 0 ? styles.textPositive : styles.textNegative}>{profit_percent.toFixed(2).replace('.', ',')}%</Text>
						</View>

						<View style={styles.detailContainerLast}>
							<Text style={styles.textTitle}>Dividendos</Text>
							<Text style={styles.textData}>R$ {formatMoney(stock.dividend)}</Text>
						</View>
					</View>
				</View>
			</>
		);
	}

	function renderItem({ item }) {
		const profit = (item.qty < 0 ) ? (Math.abs(item.qty) * item.price) - (Math.abs(item.qty) * item.avg_price) : (0);

		return (
			<RectButton style={styles.itemContainer} onPress={() => props.navigation.push('OrderEdit', {order: item})}>
				<View style={styles.itemContent}>
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
			</RectButton>
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
					data={data.orders}
					keyExtractor={item => item._id.toString()}
					ListHeaderComponent={renderHeader}
					renderItem={renderItem}
					ListFooterComponent={renderFooter}
					onRefresh={refetch}
					refreshing={refreshing}
				/>
			)}

			<TabNavigator navigation={props.navigation} />
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

	itemContainer: {
		marginTop: 16,
		marginHorizontal: 16,
		backgroundColor: '#FFF',
	},

	itemContent: {		
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

	detailContainer: {
		flex: 1, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
		paddingVertical: 8, 
		borderBottomWidth: 1, 
		borderBottomColor: '#d3dada',
	},

	detailContainerLast: {
		flex: 1, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
		paddingVertical: 8,
	},

	textHeader: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#17496E',
	},

	textPositive: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'green',
	},

	textNegative: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'red',
	},

	textTitle: {
		fontSize: 15,
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
