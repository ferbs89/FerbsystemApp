import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { useAuth } from '../hooks/useAuth';

import lunaris from '../assets/lunaris.png';
import TabNavigator from '../components/TabNavigator';

import Icon from 'react-native-vector-icons/Feather';

export default function Profile(props) {
	const { user, logout } = useAuth();

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.logoContainer}>
					<Image style={styles.logoImg} source={lunaris} />
					<Text style={styles.logoText}>Lunaris</Text>
				</View>

				<View style={styles.userContainer}>
					<Text style={styles.userName}>{user.name}</Text>
					<Text style={styles.userEmail}>{user.email}</Text>
				</View>			

				<TouchableWithoutFeedback onPress={() => {}}>
					<View style={styles.listContainer}>
						<Icon name="lock" size={24} color="#17496E" />
						<Text style={styles.listLabel}>Alterar senha</Text>
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback onPress={() => logout()}>
					<View style={styles.listContainer}>
						<Icon name="log-out" size={24} color="#17496E" />
						<Text style={styles.listLabel}>Encerrar sessão</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>

			<TabNavigator navigation={props.navigation} />
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
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},

	logoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#FFF',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},

	logoImg: {
		width: 56,
		height: 56,
	},

	logoText: {
		marginLeft: 16,
		fontSize: 32,
		fontWeight: 'bold',
		color: '#17496E',
	},

	userContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderColor: '#d3dada',
	},

	userName: {
		color: '#17496E',
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},

	userEmail: {
		color: '#737380',
	},

	listContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
		marginHorizontal: 16,
		padding: 16,
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: '#d3dada',
		borderRadius: 8,
	},

	listLabel: {
		marginLeft: 16,
		fontSize: 15,
		fontWeight: 'bold',
		color: '#17496E',
	},
});
