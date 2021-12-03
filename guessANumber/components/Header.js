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
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '#fff',
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
  },
  title: {
    textAlign: 'center',
    color: Platform.OS === 'ios' ? Colors.primary : '#fff',
  },
});

export default Header;
