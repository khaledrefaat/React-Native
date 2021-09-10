import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 30, height: 30 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});
