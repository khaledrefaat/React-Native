import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {
  const buttonStyles = props.colorSecondary
    ? { ...styles.button, ...styles.buttonSecondary, ...props.style }
    : { ...styles.button, ...props.style };
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
        <View style={buttonStyles}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </TouchableOpacity>
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
