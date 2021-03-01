import React, { useState, useMemo, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './context';

import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

import Loading from './pages/loading';
import DrawerContent from './components/DrawerContent';
import Login from './pages/login';
import Register from './pages/register';
import Stocks from './pages/stocks';
import Stock from './pages/stock';
import Orders from './pages/orders';
import Earnings from './pages/earnings';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
	<AuthStack.Navigator screenOptions={{headerShown: false}}>
		<AuthStack.Screen name="Login" component={Login} options={{animationEnabled: false}} />
		<AuthStack.Screen name="Register" component={Register} options={{animationEnabled: false}} />
	</AuthStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = (navigation) => {
	const user = navigation.route.params.user;

	return (
		<Drawer.Navigator 
			initialRouteName="Stocks" 
			drawerContent={props => <DrawerContent {...props} user={user} />}
			drawerContentOptions={{
				activeTintColor: "#17496E",
				inactiveTintColor: "#17496E",
				activeBackgroundColor: "#f5f5f5",
				labelStyle: { 
					fontWeight: 'bold', 
					fontSize: 16,
				},
			}}
		>
			<Drawer.Screen 
				name="Stocks" 
				component={Stocks} 
				options={{
					drawerLabel: 'Ativos', 
					drawerIcon: () => (<Icon name="trending-up" size={24} color="#17496E" />),
				}}
			/>

			<Drawer.Screen 
				name="Orders" 
				component={Orders} 
				options={{
					drawerLabel: 'Operações',
					drawerIcon: () => (<Icon name="layers" size={24} color="#17496E" />),
				}}
			/>

			<Drawer.Screen
				name="Earnings"
				component={Earnings}
				options={{
					drawerLabel: 'Proventos',
					drawerIcon: () => (<Icon name="zap" size={24} color="#17496E" />),
				}}
			/>
		</Drawer.Navigator>
	);
}

const RootStack = createStackNavigator();
const RootStackScreen = ({ user }) => (
	<RootStack.Navigator headerMode="none">
		{user ? (
			<>
				<RootStack.Screen
					name="App"
					component={DrawerScreen}
					options={{
						animationEnabled: false
					}}
					initialParams={{
						user
					}}
				/>

				<RootStack.Screen
					name="Stock"
					component={Stock}
					options={{
						animationEnabled: false
					}}
				/>
			</>
		) : (
			<RootStack.Screen
				name="Auth"
				component={AuthStackScreen}
				options={{
					animationEnabled: false
				}}
			/>
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
