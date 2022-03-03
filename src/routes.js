import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from './hooks/useAuth';

import Loading from './pages/loading';
import Login from './pages/login';
import Register from './pages/register';

import Stocks from './pages/stocks';
import Orders from './pages/orders';
import Dividends from './pages/dividends';
import Profile from './pages/profile';

import StockView from './pages/stock-view';
import OrderCreate from './pages/order-create';
import OrderEdit from './pages/order-edit';

const RootStack = createStackNavigator();

export function Routes() {
	const { user, loading } = useAuth();

	if (loading)
		return <Loading />;

	return (
		<NavigationContainer>
			<RootStack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }}>
				{user ? (
					<>
						<RootStack.Screen name="Stocks" 		component={Stocks} 		/>
						<RootStack.Screen name="Orders" 		component={Orders} 		/>
						<RootStack.Screen name="Dividends" 		component={Dividends} 	/>
						<RootStack.Screen name="Profile" 		component={Profile} 	/>

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
		</NavigationContainer>
	)
}
