import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';

import { AuthProvider } from './hooks/useAuth';
import { queryClient } from './services/queryClient';
import { Routes } from './routes';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
	return (
		<>
			<StatusBar backgroundColor="#143E5E" barStyle="light-content" />

			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<Routes />
				</QueryClientProvider>
			</AuthProvider>

			<Toast ref={(ref) => Toast.setRef(ref)} />
		</>
	);
};
