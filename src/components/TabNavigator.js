import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export default function TabNavigator({ navigation }) {
	return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Stocks')}>
                <View style={styles.itemContainer}>
                    <Icon name="trending-up" size={24} color="#17496E" />
                    <Text style={styles.itemLabel}>Ativos</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Orders')}>
                <View style={styles.itemContainer}>
                    <Icon name="layers" size={24} color="#17496E" />
                    <Text style={styles.itemLabel}>Operações</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Earnings')}>
                <View style={styles.itemContainer}>
                    <Icon name="zap" size={24} color="#17496E" />
                    <Text style={styles.itemLabel}>Proventos</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
                <View style={styles.itemContainer}>
                    <Icon name="user" size={24} color="#17496E" />
                    <Text style={styles.itemLabel}>Perfil</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#dcdce6',
        backgroundColor: '#FFF',
        height: 64,
	},

    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemLabel: {
        marginTop: 4,
        fontSize: 13,
		fontWeight: 'bold',
        color: '#17496E',
    },
});
