import React, { PropsWithChildren } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { PRODUCTS } from '../constants';
import { RootStackParamList } from 'App';

const Header = ({ children }: PropsWithChildren): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  const currentScreenName = route.name;

  const renderBackButton = (): JSX.Element => (
    <View style={styles.goBack}>
      <Button title={'< Back'} onPress={() => navigation.goBack()} />
    </View>
  );

  return (
    <View style={styles.headerWrapper}>
      {navigation.canGoBack() &&
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
