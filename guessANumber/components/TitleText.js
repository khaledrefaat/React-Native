import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TitleText = ({ children, style, ...rest }) => {
  return (
    <Text style={{ ...styles.title, ...style }} {...rest}>
      {children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    textTransform: 'capitalize',
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'montserrat-bold',
  },
});
