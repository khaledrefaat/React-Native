import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const NumberContainer = props => {
  return (
    <View {...props} style={{ ...styles.numberContainer, ...props.style }}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    borderColor: Colors.secondary,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  number: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default NumberContainer;
