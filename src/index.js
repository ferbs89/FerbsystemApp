import React, { useState, useMemo, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './context';

import axios from 'axios';
import Toast from 'react-native-toast-message';

import Loading from './pages/loading';
import Login from './pages/login';
import Register from './pages/register';

import Stocks from './pages/stocks';
import Orders from './pages/orders';
import Earnings from './pages/earnings';
import Profile from './pages/profile';

import StockView from './pages/stock-view';
import OrderCreate from './pages/order-create';
import OrderEdit from './pages/order-edit';

const RootStack = createStackNavigator();
const RootStackScreen = ({ user }) => (
	<RootStack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }}>
		{user ? (
			<>
				<RootStack.Screen name="Stocks" 		component={Stocks} 		/>
				<RootStack.Screen name="Orders" 		component={Orders} 		/>
				<RootStack.Screen name="Earnings" 		component={Earnings} 	/>
				<RootStack.Screen name="Profile" 		component={Profile} 	initialParams={{ user }} />

				<RootStack.Screen name="StockView" 		component={StockView} 	/>
				<RootStack.Screen name="OrderCreate" 	component={OrderCreate}	/>
				<RootStack.Screen name="OrderEdit" 		component={OrderEdit} 	/>
			</>
		) : (
			<>
				<RootStack.Screen name="Login" 			component={Login} 		/>
				<RootStack.Screen name="Register" 		component={Register} 	/>
			</>
		)}
	</RootStack.Navigator>
);

export default function App() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const authContext = useMemo(() => {
		return {
			signIn: (user) => {
				setUser(user);
			},

			signUp: (user) => {
				setUser(user);
			},

			signOut: async () => {
				await axios.get('https://ferbsystem.vercel.app/api/logout').then(response => {
					setUser(null);
				}).catch(error => {
					console.log(error.response.status);
				});
			},
		};
	}, []);

	useEffect(() => {
		axios.get('https://ferbsystem.vercel.app/api/user').then(response => {
			if (response.data.isLoggedIn)
				setUser(response.data);

			setIsLoading(false);

		}).catch(error => {
			setUser(null);
			setIsLoading(false);
		});
	}, []);

	if (isLoading)
		return <Loading />;

	return (
		<>
			<StatusBar backgroundColor="#17496E" barStyle="light-content" />

			<AuthContext.Provider value={authContext}>
				<NavigationContainer>
					<RootStackScreen user={user} />
				</NavigationContainer>
			</AuthContext.Provider>

			<Toast ref={(ref) => Toast.setRef(ref)} />
		</>
	);
};
