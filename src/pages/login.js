import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableWithoutFeedback, Text, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context';

import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

import logoImg from '../assets/logo.png';

export default function Login({ navigation }) {
	const { signIn } = useContext(AuthContext);

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);

	async function handleLogin() {
		if (!email || !password) {
			Toast.show({
				type: 'error',
				text1: 'Preencha os campos de e-mail e senha.',
			});

			return;
		}

		setLoading(true);

		await axios.post('https://ferbsystem.vercel.app/api/login', { 
			email, 
			password,
		
		}).then(response => {
			signIn(response.data);

		}).catch(error => {
			setLoading(false);

			Toast.show({
				type: 'error',
				text1: error.response.data,
			});
		});
	}

	return (
		<View style={styles.loginContainer}>
			{loading ? (
				<ActivityIndicator color="#FFF" size="large" />
			) : (
				<View style={styles.loginContent}>
					<View style={styles.logoContainer}>
						<Image source={logoImg} />
					</View>

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

					<TouchableWithoutFeedback onPress={handleLogin}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Entrar</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
						<View style={styles.buttonOutline}>
							<Icon name="log-in" size={24} color="#17496E" />
							<Text style={styles.buttonOutlineText}>Não tenho cadastro</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			)}
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
		backgroundColor: '#eef6fb',
		borderRadius: 8,
		padding: 16,
	},
	
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
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
		borderColor: '#dcdce6',
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
