import { useQuery } from '@apollo/client';
import React, { FC } from 'react';

import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import styled from 'styled-components';
import Header from '../components/Header';
import { getProductsQuery } from '../queries';
import { PRODUCTS } from '../constants';

const Store: FC = (): JSX.Element => {
  const { loading, data } = useQuery(getProductsQuery);

  const displayData = (): JSX.Element => {
    if (!data) {
      return <p>No Products</p>;
    }

    return (
      <CardsContainer>
        {data.products.map((product: Product) => (
          <ProductCard
            key={product.ean}
            imageUrl={product.imageUrl}
            name={product.name}
            ean={product.ean}
            price={product.price}
          />
        ))}
      </CardsContainer>
    );
  };

  return (
    <BodyContainer>
      <Header />
      <AvailableProducts>
        <h2>{PRODUCTS}</h2>
        {loading ? <p>Loading products...</p> : displayData()}
      </AvailableProducts>
    </BodyContainer>
  );
};

export default Store;

const BodyContainer = styled.div`
  margin: 50px;
`;

const AvailableProducts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
