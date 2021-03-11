import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../context';

import logoImg from '../assets/logo.png';
import lunaris from '../assets/lunaris.png';
import Icon from 'react-native-vector-icons/Feather';

export default function DrawerContent(props) {
	const { signOut } = useContext(AuthContext);

	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.logoContainer}>
				<Image style={styles.logoImg} source={lunaris} />
				<Text style={styles.logoText}>Lunaris</Text>
			</View>

			<View style={styles.userContainer}>
				<Text style={styles.userName}>{props.user.name}</Text>
				<Text style={styles.userEmail}>{props.user.email}</Text>
			</View>

			<DrawerItemList {...props} />

			<DrawerItem 
				{...props}
				icon={() => (<Icon name="log-out" size={24} color="#17496E" />)} 
				label="Sair" 
				onPress={() => signOut()}
			/>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	logoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 16,
		paddingHorizontal: 16,
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
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#dcdce6',
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
});
