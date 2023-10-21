import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Palette from '../Color';
import CustomButton from './CustomButton';
import { useCart } from '../context';
import { CartItem } from '../types';
import { CART, MY_ORDERS, NAME } from '../constants';

const Header: FC = (): JSX.Element => {
  const { cart } = useCart();

  const calculateTotalQuantity = (cartItems: CartItem[]): number => {
    return cartItems.reduce((totalQuantity, cartItem) => {
      return totalQuantity + cartItem.quantity;
    }, 0);
  };
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoLink to='/'>
          <Logo>{NAME}</Logo>
        </LogoLink>
        <OrdersLink to='/orders'>{MY_ORDERS}</OrdersLink>
      </LogoContainer>
      <ButtonLink to='/order-details'>
        <CustomButton label={CART} onClick={() => {}} badgeNumber={calculateTotalQuantity(cart)} />
      </ButtonLink>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 2rem;
  margin-right: 3rem;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const OrdersLink = styled(Link)`
  margin-right: 1rem;
  color: ${Palette.darkBlue};
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
`;
