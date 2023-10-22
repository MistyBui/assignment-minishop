import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { PRODUCTS } from '../constants';
import { navigationRef } from '../App';
import { useFocusEffect } from '@react-navigation/native';

const Header = ({ children }: PropsWithChildren): JSX.Element => {
  const [currentScreenName, setCurrentScreenName] = useState<string | null>(
    null,
  );

  //set route name everytime the component is called
  useFocusEffect(
    useCallback(() => {
      const route = navigationRef.current?.getCurrentRoute();
      setCurrentScreenName(route?.name || null);
    }, []),
  );

  const renderBackButton = (): JSX.Element => (
    <View style={styles.goBack}>
      <Button
        title={'< Back'}
        onPress={() => navigationRef.current?.goBack()}
      />
    </View>
  );

  return (
    <View style={styles.headerWrapper}>
      {navigationRef.current?.canGoBack() &&
        currentScreenName !== PRODUCTS && //The back button show at the front page after navigate from OrderDetails page
        renderBackButton()}
      <Text style={styles.header}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: 16,
  },

  header: {
    fontSize: 32,
    marginStart: 10,
  },

  goBack: {
    left: 0,
    alignItems: 'flex-start',
  },
});

export default Header;
