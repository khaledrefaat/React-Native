import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Header;
