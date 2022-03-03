import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableWithoutFeedback, Text } from 'react-native';

import { useAuth } from '../hooks/useAuth';

import lunaris from '../assets/lunaris.png';
import Icon from 'react-native-vector-icons/Feather';

export default function Register({ navigation }) {
	const { register } = useAuth();

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	return (
		<View style={styles.loginContainer}>
			<View style={styles.loginContent}>
				<View style={styles.logoContainer}>
					<Image style={styles.logoImg} source={lunaris} />
					<Text style={styles.logoText}>Lunaris</Text>
				</View>

				<Text style={styles.loginTitle}>Criar uma conta</Text>

				<Text style={styles.loginDescription}>Faça seu cadastro para entrar na plataforma.</Text>

				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Nome"
					value={name}
					onChangeText={setName}
				/>

				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="E-mail"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
				/>

				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Senha"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>

				<TouchableWithoutFeedback onPress={() => register(name, email, password)}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Cadastrar</Text>
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback onPress={() => { navigation.navigate('Login') }}>
					<View style={styles.buttonOutline}>
						<Icon name="arrow-left" size={24} color="#17496E" />
						<Text style={styles.buttonOutlineText}>Voltar para o login</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#17496E',
		padding: 16,
	},
	
	loginContent: {
		backgroundColor: '#f9fafa',
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
	},
	
	logoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
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

	loginTitle: {
		marginBottom: 8,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},

	loginDescription: {
		marginBottom: 16,
		textAlign: "center",
		color: '#737380',
	},

	textInput: {
		alignSelf: 'stretch',
		paddingVertical: 0,
		paddingHorizontal: 16,
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: '#d3dada',
		height: 48,
		borderRadius: 8,
		marginBottom: 16,
	},

	button: {
		height: 48,
		borderRadius: 8,
		backgroundColor: '#17496E',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},

	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
	},

	buttonOutline: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonOutlineText: {
		marginLeft: 8,
		color: '#17496E',
		fontWeight: 'bold',
	},
});
