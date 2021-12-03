import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ScrollView,
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  const [detectedDeviceWidth, setDetectedDeviceWidth] = useState(
    Dimensions.get('window').width
  );

  useEffect(() => {
    const setDetectedWidth = () =>
      setDetectedDeviceWidth(Dimensions.get('window').width);
    Dimensions.addEventListener('change', setDetectedWidth);

    return () => Dimensions.removeEventListener('change', setDetectedWidth);
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: detectedDeviceWidth * 0.7,
            height: detectedDeviceWidth * 0.7,
            borderRadius: (detectedDeviceWidth * 0.7) / 2,
          }}
        >
          <Image
            style={styles.image}
            source={require('../assets/success.png')}
          />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  imageContainer: {
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
