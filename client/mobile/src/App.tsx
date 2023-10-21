import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Products from './screens/Products';
import Orders from './screens/Orders';
import OrderDetails from './screens/OrderDetails';
import { CartProvider } from './context/index';
import { PRODUCTS, ORDERS, ORDER_DETAILS } from './constants';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={PRODUCTS} component={Products} />
        <Stack.Screen name={ORDERS} component={Orders} />
        <Stack.Screen name={ORDER_DETAILS} component={OrderDetails} />
      </Stack.Navigator>
    </CartProvider>
  );
};

export default App;
