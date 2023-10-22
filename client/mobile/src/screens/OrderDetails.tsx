import React, { FC } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';

import Header from '../components/Header';
import { useCart } from '../context';
import { CartItem } from 'types';
import CustomButton from '../components/CustomButton';
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  REDUCE_PRODUCT,
  ORDER_CONFIRMATION,
} from '../constants';

const OrderDatails: FC = (): JSX.Element => {
  const { cart, addToCart, reduceFromCart, removeFromCart } = useCart();

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Image source={{ uri: item.product.imageUrl }} style={styles.image} />
        <CustomButton
          title={DELETE_PRODUCT}
          onPress={() => {
            removeFromCart(item.product.ean);
          }}
          buttonStyle={styles.deleteButton}
        />
      </View>
      <View style={styles.cell}>
        <CustomButton
          title={REDUCE_PRODUCT}
          onPress={() => reduceFromCart(item.product)}
        />
        <Text>{item.quantity}</Text>
        <CustomButton
          title={ADD_PRODUCT}
          onPress={() => {
            addToCart(item.product);
          }}
        />
      </View>
      <View style={styles.cell}>
        <Text>${item.product.price}</Text>
      </View>
      <View style={styles.cell}>
        <Text>${(item.product.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <View style={styles.wrapper}>
      <Header>{ORDER_CONFIRMATION}</Header>
      {cart.length === 0 ? (
        <Text style={styles.text}>No orders</Text>
      ) : (
        <View style={styles.body}>
          <View style={styles.tableHeader}>
            <View style={styles.cell}>
              <Text>Product</Text>
            </View>
            <View style={styles.cell}>
              <Text>Quantity</Text>
            </View>
            <View style={styles.cell}>
              <Text>Price</Text>
            </View>
            <View style={styles.cell}>
              <Text>Total</Text>
            </View>
          </View>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.totalContainer}>
            <Text>Total Amount: ${totalAmount}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    paddingTop: 48,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
    marginRight: 30,
  },
  body: {
    marginTop: 30,
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    bottom: -5,
  },
  text: {
    marginStart: 10,
  },
});

export default OrderDatails;
