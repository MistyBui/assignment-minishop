import type { GetOrdersQuery } from '../../../../server/src/generated/graphql';

import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import Header from '../components/Header';
import OrderSummary from '../components/OrderSummary';
import { OrderCard } from '../types';
import { ordersQuery } from '../queries';
import { ORDERS } from '../constants';

const Orders: FC = (): JSX.Element => {
  const { loading, data } = useQuery<GetOrdersQuery>(ordersQuery, {
    variables: { customerId: 'customer-1' },
  });

  return (
    <View style={styles.wrapper}>
      <Header>{ORDERS}</Header>
      <ScrollView>
        {loading ? (
          <Text>Loading orders...</Text>
        ) : (
          data?.orders.map((order: OrderCard) => (
            <OrderSummary
              key={order.orderId}
              orderId={order.orderId}
              timestamp={order.timestamp}
              totalSum={order.totalSum}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    paddingTop: 48,
  },
});

export default Orders;
