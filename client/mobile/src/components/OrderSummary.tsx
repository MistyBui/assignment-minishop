import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { OrderCard } from 'types';

const OrderSummary: FC<OrderCard> = ({
  timestamp,
  totalSum,
  orderId,
}): JSX.Element => {
  const formatTimestamp = (timeStr: string): string => {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes + ' - ' + date.toLocaleDateString();
  };

  return (
    <View style={styles.cardContainer} key={orderId}>
      <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
      <Text style={styles.total}>Total: ${totalSum.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timestamp: {
    fontSize: 16,
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

export default OrderSummary;
