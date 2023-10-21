import React, { FC } from 'react';
import styled from 'styled-components';

import { OrderCard } from '../types';

const OrderSummary: FC<OrderCard> = ({ timestamp, totalSum, orderId }): JSX.Element => {
  //format timestamp to human readable
  const formatTimestamp = (timeStr: string): string => {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes + ' ' + date.toLocaleDateString();
  };

  return (
    <OrderHistoryCardContainer key={orderId}>
      <OrderInfo>
        <Label>Order</Label>
        <Value>{formatTimestamp(timestamp)}</Value>
      </OrderInfo>
      <OrderInfo>
        <Label>Total Price</Label>
        <Value>${totalSum.toFixed(2)}</Value>
      </OrderInfo>
    </OrderHistoryCardContainer>
  );
};

export default OrderSummary;

const OrderHistoryCardContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  width: 300px;
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span``;
