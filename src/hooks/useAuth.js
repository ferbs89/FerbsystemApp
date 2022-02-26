import React, { createContext, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		loadSession();
	}, []);

	async function loadSession() {
		await api.get('/user').then(response => {
			if (response.data.isLoggedIn)
				setUser(response.data);

		}).catch(error => {
			setUser(null);

		}).finally(() => {
			setLoading(false);
		});
	}

	async function login(email, password) {
		if (!email || !password) {
			Toast.show({
				type: 'error',
				text1: 'Preencha os campos de e-mail e senha.',
			});

			return;
		}

		setLoading(true);

		await api.post('/login', { 
			email, 
			password,
		
		}).then(response => {
			setUser(response.data);

		}).catch(error => {
			setUser(null);

			Toast.show({
				type: 'error',
				text1: error.response.data,
			});

		}).finally(() => {
			setLoading(false);
		});
	}

	async function logout() {
		await api.get('/logout').then(response => {
			setUser(null);
			queryClient.clear();

		}).catch(error => {
			console.log(error.response.status);
		});
	}

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext);
