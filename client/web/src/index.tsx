import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

import OrderDetails from './screens/OrderDetails';
import Orders from './screens/Orders';
import Store from './screens/Products';
import { CartProvider } from './context';

const gqlClient = new ApolloClient({
  uri: 'http://localhost:4000',

  cache: new InMemoryCache(),
});
loadDevMessages();
loadErrorMessages();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Store />,
  },
  {
    path: 'orders/',
    element: <Orders />,
  },
  {
    path: 'order-details/',
    element: <OrderDetails />,
  },
]);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <ApolloProvider client={gqlClient}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </ApolloProvider>,
);
