import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import { useCart } from '../context';
import { CartItem } from '../types';
import CustomButton from '../components/CustomButton';
import { ADD_PRODUCT, DELETE_PRODUCT, ORDER_CONFIRMATION, REDUCE_PRODUCT } from '../constants';

const OrderDetails: FC = (): JSX.Element => {
  const { cart, addToCart, reduceFromCart, removeFromCart } = useCart();

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <BodyContainer>
      <Header />
      <OrderConfirmation>
        <h2>{ORDER_CONFIRMATION}</h2>
        {cart.length === 0 ? (
          <p>No orders</p>
        ) : (
          <OrderTable>
            <thead>
              <tr>
                <TableHeader>Product</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Total</TableHeader>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem, index: number) => (
                <tr key={index}>
                  <TableCell>
                    <HorizontalLayout>
                      <ProductImg src={item.product.imageUrl} alt={item.product.name} />
                      <CustomButton
                        label={DELETE_PRODUCT}
                        onClick={() => {
                          removeFromCart(item.product.ean);
                        }}
                      />
                    </HorizontalLayout>
                  </TableCell>
                  <TableCell>${item.product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <HorizontalLayout>
                      <CustomButton
                        label={REDUCE_PRODUCT}
                        onClick={() => {
                          reduceFromCart(item.product);
                        }}
                      />
                      {item.quantity}
                      <CustomButton
                        label={ADD_PRODUCT}
                        onClick={() => {
                          addToCart(item.product);
                        }}
                      />
                    </HorizontalLayout>
                  </TableCell>
                  <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                </tr>
              ))}
              <tr>
                <TableCellLast />
                <TableCellLast />
                <TableCellLast />
                <TableCellLast>
                  <OrderTotal>Total: ${totalAmount.toFixed(2)}</OrderTotal>
                </TableCellLast>
              </tr>
            </tbody>
          </OrderTable>
        )}
      </OrderConfirmation>
    </BodyContainer>
  );
};

export default OrderDetails;

const OrderConfirmation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyContainer = styled.div`
  margin: 50px;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  table-layout: fixed;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const TableCellLast = styled.td`
  padding: 10px;
  text-align: center;
`;

const OrderTotal = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
`;

const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const HorizontalLayout = styled.td`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
