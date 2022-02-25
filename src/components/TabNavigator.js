import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export default function TabNavigator({ navigation }) {
	return (
        <View style={styles.container}>
            <RectButton style={styles.itemContainer} onPress={() => navigation.navigate('Stocks')}>
                <Icon name="trending-up" size={24} color="#FFFFFF" />
            </RectButton>

            <RectButton style={styles.itemContainer} onPress={() => navigation.navigate('Orders')}>
                <Icon name="layers" size={24} color="#FFFFFF" />
            </RectButton>

            <RectButton style={styles.itemContainer} onPress={() => navigation.navigate('Dividends')}>
                <Icon name="zap" size={24} color="#FFFFFF" />
            </RectButton>

            <RectButton style={styles.itemContainer} onPress={() => navigation.navigate('Profile')}>
                <Icon name="user" size={24} color="#FFFFFF" />
            </RectButton>
        </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#17496E',
        height: 56,
	},

    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
