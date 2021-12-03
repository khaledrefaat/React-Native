import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';

import TitleText from './TitleText';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.title}>{title}</TitleText>
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
    textAlign: 'center',
    color: '#fff',
  },
});

export default Header;
