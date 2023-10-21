import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Props {
  onPress: () => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<Props> = ({
  onPress,
  title,
  buttonStyle,
}): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, buttonStyle]}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  button: {
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CustomButton;
