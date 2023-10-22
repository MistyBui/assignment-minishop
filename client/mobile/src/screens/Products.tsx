import type { GetProductsQuery } from '../../../../server/src/generated/graphql';

import React, { FC } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useQuery } from '@apollo/client';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { CartItem, Product } from 'types';
import { ORDERS, ORDER_DETAILS, PRODUCTS } from '../constants';
import { useCart } from '../context';
import { getProductsQuery } from '../queries';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'App';

const Products: FC = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { loading, data } = useQuery<GetProductsQuery>(getProductsQuery);
  const { cart } = useCart();

  const calculateTotalQuantity = (cartItems: CartItem[]): number => {
    return cartItems.reduce((totalQuantity, cartItem) => {
      return totalQuantity + cartItem.quantity;
    }, 0);
  };

  const displayData = () => {
    if (!data) {
      return <Text>{'No Products'}</Text>;
    }

    return data.products.map((product: Product, i: number) => (
      <ProductCard
        key={`product-${i}`}
        ean={product.ean}
        imageUrl={product.imageUrl}
        name={product.name}
        price={product.price}
      />
    ));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topButtons}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate(ORDERS)}>
          <Image
            style={styles.iconButton}
            source={require('../../assets/images/history.png')}
          />
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate(ORDER_DETAILS)}>
          <Image
            style={styles.iconButton}
            source={require('../../assets/images/shopping-bag.png')}
          />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {calculateTotalQuantity(cart).toString()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Header>{PRODUCTS}</Header>
      <ScrollView>
        {loading ? <Text>{'Loading products...'}</Text> : displayData()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    paddingTop: 48,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  space: {
    width: 15,
  },
});

export default Products;
