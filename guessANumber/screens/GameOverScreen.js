import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over</TitleText>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/success.png')} />
        {/* this is how to add url images and other props working on the local image too  */}
        {/* <Image
          style={styles.image}
          fadeDuration={1000}
          resizeMode="cover"
          source={{
            uri: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          }}
        /> */}
      </View>
      <BodyText style={styles.text}>
        Game Rounds:
        <Text style={styles.textHightlight}>{props.gameRounds}</Text>
      </BodyText>
      <BodyText style={styles.text}>
        Number Was:
        <Text style={styles.textHightlight}>{props.userChoice}</Text>
      </BodyText>
      <View style={styles.buttonContainer}>
        <MainButton onPress={props.startNewGame}>New Game</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    borderColor: '#000',
    borderWidth: 3,
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
  textHightlight: {
    color: Colors.primary,
    fontFamily: 'montserrat-bold',
  },
});

export default GameOverScreen;
