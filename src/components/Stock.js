import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { formatMoney } from '../utils/functions';
import Icon from 'react-native-vector-icons/Feather';

export default function Stock({ item, navigation }) {
	const [showDetails, setShowDetails] = useState(false)
	const profit = (item.qty * item.marketPrice) - item.total;
	const profit_percent = (item.marketPrice - item.avg_price) / item.avg_price * 100;

	return (
		<RectButton style={styles.itemContainer} onPress={() => setShowDetails(!showDetails)}>
			<View style={styles.itemContent}>
				<View style={styles.headerContainer}>
					<Text style={styles.textHeader}>{item._id} ({item.marketChangePercent.toFixed(2).toString().replace('.', ',') + '%'})</Text>
					<Text style={item.marketChangePercent > 0 ? styles.textPositive : styles.textNegative}>R$ {formatMoney(item.marketPrice)}</Text>
				</View>

				<View style={{ paddingHorizontal: 8, }}>
					<View style={ showDetails ? styles.detailContainer : styles.detailContainerLast}>
						<Text style={styles.textTitle}>Intradia</Text>
						
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 4 }}>
								<Icon name="arrow-down" size={16} color="red" />
								<Text style={styles.textData}>R$ {formatMoney(item.marketDayLow)}</Text>
							</View>

							<View style={{ flexDirection: 'row', alignItems: 'center', }}>
								<Icon name="arrow-up" size={16} color="green" />
								<Text style={styles.textData}>R$ {formatMoney(item.marketDayHigh)}</Text>
							</View>
						</View>
					</View>

					{showDetails && (
						<>
							<View style={styles.detailContainer}>
								<Text style={styles.textTitle}>Custo</Text>
								<Text style={styles.textData}>R$ {formatMoney(item.avg_price)}</Text>
							</View>

							<View style={styles.detailContainer}>
								<Text style={styles.textTitle}>Quantidade</Text>
								<Text style={styles.textData}>{item.qty}</Text>
							</View>

							<View style={styles.detailContainer}>
								<Text style={styles.textTitle}>Total</Text>
								<Text style={styles.textData}>R$ {formatMoney(item.qty * item.marketPrice)}</Text>
							</View>

							<View style={styles.detailContainer}>
								<Text style={styles.textTitle}>Lucro</Text>
								<Text style={profit > 0 ? styles.textPositive : styles.textNegative}>R$ {formatMoney(profit)}</Text>
							</View>

							<View style={styles.detailContainer}>
								<Text style={styles.textTitle}>Rentabilidade</Text>
								<Text style={profit_percent > 0 ? styles.textPositive : styles.textNegative}>{profit_percent.toFixed(2).replace('.', ',')}%</Text>
							</View>

							<View style={styles.detailContainer}>
								<Text style={styles.textTitle}>Dividendos</Text>
								<Text style={styles.textData}>R$ {formatMoney(item.dividend)}</Text>
							</View>

							<RectButton style={styles.buttonOutline} onPress={() => {
								navigation.push('StockView', {stock: item._id});
								setShowDetails(false);
							}}>
								<Icon name="search" size={16} color="#ffffff" />
								<Text style={styles.buttonOutlineText}>Mais detalhes</Text>
							</RectButton>
						</>
					)}
				</View>
			</View>
		</RectButton>
	);
}

const styles = StyleSheet.create({
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

	buttonOutline: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 32,
		backgroundColor: '#17496E',
		borderRadius: 4,
		marginVertical: 8,
	},

	buttonOutlineText: {
		marginLeft: 4,
		color: '#ffffff',
		fontSize: 12,
		fontWeight: 'bold',
	}
});
