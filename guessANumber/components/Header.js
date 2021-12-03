import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';

import TitleText from './TitleText';

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  headerIos: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  title: {
    textAlign: 'center',
    color: Platform.OS === 'ios' ? Colors.primary : '#fff',
  },
});

export default Header;
