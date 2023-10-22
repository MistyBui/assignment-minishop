import React, { createRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Products from './screens/Products';
import Orders from './screens/Orders';
import OrderDetails from './screens/OrderDetails';
import { CartProvider } from './context/index';
import { PRODUCTS, ORDERS, ORDER_DETAILS } from './constants';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

export type RootStackParamList = {
  Products: undefined;
  Orders: undefined;
  OrderDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createRef<NavigationContainerRef<any>>();

export const navigate = (name: string, params?: object) => {
  navigationRef.current?.navigate(name, params);
};

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer independent={true} ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={PRODUCTS}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name={PRODUCTS} component={Products} />
          <Stack.Screen name={ORDERS} component={Orders} />
          <Stack.Screen name={ORDER_DETAILS} component={OrderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
