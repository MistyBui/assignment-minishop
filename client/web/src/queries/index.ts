import { gql } from 'graphql-tag';

export const getProductsQuery = gql(`
  query getProducts {
    products {
      ean
      imageUrl
      name
      price
    }
  }
`);

export const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        amount
        ean
      }
      totalSum
    }
  }`);
