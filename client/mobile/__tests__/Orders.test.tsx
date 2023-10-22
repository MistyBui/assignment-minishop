import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import Orders from '../src/screens/Orders';
import { ordersQuery } from '../src/queries';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: ordersQuery,
      variables: { customerId: 'customer-1' },
    },
    result: {
      data: {
        orders: [
          {
            orderId: 'order-1',
            timestamp: '2023-09-22T12:00:00Z',
            totalSum: 100,
          },
        ],
      },
    },
  },
];

describe('Orders Screen', () => {
  it('renders loading state initially', () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <Orders />
        </NavigationContainer>
      </MockedProvider>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders orders when data is loaded', async () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <Orders />
        </NavigationContainer>
        ;
      </MockedProvider>,
    );

    // Wait for the Apollo queries to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
