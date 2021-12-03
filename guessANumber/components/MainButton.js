import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {
  const buttonStyles = props.colorSecondary
    ? { ...styles.button, ...styles.buttonSecondary, ...props.style }
    : { ...styles.button, ...props.style };

  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 20)
    ButtonComponent = TouchableNativeFeedback;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.7} onPress={props.onPress}>
        <View style={buttonStyles}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'montserrat',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
});

export default MainButton;
