import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import OrderSummary from '../components/OrderSummary';
import { OrderCard } from '../types';
import Header from '../components/Header';
import { ordersQuery } from '../queries';

const Orders: FC = (): JSX.Element => {
  const { loading, data } = useQuery(ordersQuery, {
    variables: { customerId: 'customer-1' },
  });

  return (
    <BodyContainer>
      <Header />
      <CardsContainer>
        <h2>My order history</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          data?.orders.map((order: OrderCard) => (
            <OrderSummary
              key={order.orderId}
              timestamp={order.timestamp}
              totalSum={order.totalSum}
              orderId={order.orderId}
            />
          ))
        )}
      </CardsContainer>
    </BodyContainer>
  );
};

export default Orders;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyContainer = styled.div`
  margin: 50px;
`;
