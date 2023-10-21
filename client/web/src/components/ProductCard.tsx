import React, { FC } from 'react';
import styled from 'styled-components';

import { Product } from '../types';
import { ADD_TO_CART } from '../constants';
import { useCart } from '../context';
import Palette from '../Color';

const ProductCard: FC<Product> = ({ imageUrl, name, ean, price }): JSX.Element => {
  const { addToCart } = useCart();

  return (
    <CardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <InfoContainer>
        <div>
          <ProductName>{name}</ProductName>
          <ProductCode>{ean}</ProductCode>
        </div>
        <ProductPrice>{price.toFixed(2)} €</ProductPrice>
      </InfoContainer>
      <Button
        onClick={() => {
          addToCart({ imageUrl, name, ean, price });
        }}>
        {ADD_TO_CART}
      </Button>
    </CardContainer>
  );
};

export default ProductCard;

const CardContainer = styled.div`
  border: 1px solid #ccc;
  min-width: 200px;
  padding: 16px;
  border-radius: 8px;
  margin: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled.img`
  height: 100px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const InfoContainer = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const ProductName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ProductCode = styled.p`
  font-size: 14px;
  color: #666;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background-color: ${Palette.darkBlue};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
