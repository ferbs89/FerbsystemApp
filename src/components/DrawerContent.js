import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../context';

import logoImg from '../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';

export default function DrawerContent(props) {
	const { signOut } = useContext(AuthContext);

	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.logoContainer}>
				<Image source={logoImg} />
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
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 16,
		paddingHorizontal: 16,
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
