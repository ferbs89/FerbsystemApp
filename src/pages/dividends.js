import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useQuery } from 'react-query';

import { api } from '../services/api';
import { formatMoney, formatDateDMY } from '../utils/functions';

import Loading from '../components/Loading';
import TabNavigator from '../components/TabNavigator';

export default function Dividends({ navigation }) {
	const [refreshing, setRefreshing] = useState(false);

	const { data: dividends, isLoading, refetch } = useQuery('dividends', async () => {
		const response = await api.get('/dividends');
		return response.data;
	}, {
		staleTime: 1000 * 60 * 10, // 10 minutes
	});

	function renderHeader() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Dividendos</Text>
			</View>
		);
	}

	function renderItem({ item }) {
		return (
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
				<View style={styles.content}>
					<FlatList
						data={dividends}
						keyExtractor={item => item._id.toString()}
						renderItem={renderItem}
						ListHeaderComponent={renderHeader}
						ListFooterComponent={renderFooter}
						onRefresh={refetch}
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
