import React, { FC } from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Product } from 'types';
import { ADD_TO_CART } from '../constants';
import { useCart } from '../context';

const ProductCard: FC<Product> = ({
  imageUrl,
  name,
  ean,
  price,
}): JSX.Element => {
  const { addToCart } = useCart();

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.productImage} source={{ uri: imageUrl }} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productCode}>{ean}</Text>
        </View>
        <Text style={styles.productPrice}>{price.toFixed(2)} €</Text>
      </View>
      <Button
        title={ADD_TO_CART}
        onPress={() =>
          addToCart({
            imageUrl,
            name,
            ean,
            price,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 8,
  },
});

export default ProductCard;
