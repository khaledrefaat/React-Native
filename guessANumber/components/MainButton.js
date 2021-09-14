import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {
  const renderButton = props.colorSecondary ? (
    <View
      style={{ ...styles.button, ...styles.buttonSecondary, ...props.style }}
    >
      <Text style={styles.buttonText}>{props.children}</Text>
    </View>
  ) : (
    <View style={{ ...styles.button, ...props.style }}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </View>
  );

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      {renderButton}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
