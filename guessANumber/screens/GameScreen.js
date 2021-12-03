import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if (randNum === exclude) return generateRandomBetween(min, max, exclude);
  return randNum;
};

const GameScreen = ({ userChoice, onGameOver }) => {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  useEffect(() => {
    changeScreenOrientation();
  }, []);

  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, userChoice).toString();
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGusses, setPastGusses] = useState([initialGuess]);
  const [detectedDeviceHeight, setDetectedDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const [detectedDeviceWidth, setDetectedDeviceWidth] = useState(
    Dimensions.get('window').height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) onGameOver(pastGusses.length);
  }, [userChoice, onGameOver, currentGuess]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    direction === 'lower'
      ? (currentHigh.current = currentGuess)
      : (currentLow.current = currentGuess + 1);

    const nextNumber = generateRandomBetween(
      currentHigh.current,
      currentLow.current,
      currentGuess
    );
    console.log(nextNumber + ' -------------------- nextNumber');
    setCurrentGuess(nextNumber);
    setPastGusses(currentGuesses => [nextNumber.toString(), ...currentGuesses]);
  };

  let gameListContainer = styles.listLargeContainer;

  if (detectedDeviceWidth < 350) {
    gameListContainer = styles.listSmallContainer;
  }

  const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );

  useEffect(() => {
    const setDetectedHeight = () => {
      setDetectedDeviceHeight(Dimensions.get('window').height);
      setDetectedDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', setDetectedHeight);
    return () => Dimensions.removeEventListener('change', setDetectedHeight);
  });

  if (detectedDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Opponent's Guess</BodyText>
        <View style={styles.controls}>
          <View>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove-sharp" size={24} color="white" />
            </MainButton>
          </View>
          <NumberContainer styke={styles.NumberContainer}>
            {currentGuess}
          </NumberContainer>
          <View>
            <MainButton
              colorSecondary
              onPress={nextGuessHandler.bind(this, 'greater')}
            >
              <Ionicons name="add-sharp" size={24} color="white" />
            </MainButton>
          </View>
        </View>
        <View style={gameListContainer}>
          <FlatList
            keyExtractor={item => item}
            data={pastGusses}
            renderItem={renderListItem.bind(this, pastGusses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer styke={styles.NumberContainer}>
        {currentGuess}
      </NumberContainer>
      <Card
        style={{
          ...styles.card,
          marginTop: detectedDeviceHeight > 600 ? 20 : 5,
        }}
      >
        <View style={styles.button}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="remove-sharp" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton
            colorSecondary
            onPress={nextGuessHandler.bind(this, 'greater')}
          >
            <Ionicons name="add-sharp" size={24} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={gameListContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGusses.map((guess, index) =>
            renderListItem(guess, pastGusses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGusses}
          renderItem={renderListItem.bind(this, pastGusses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
  },
  card: {
    width: 300,
    maxWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  NumberContainer: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  button: {
    width: '35%',
  },
  listLargeContainer: {
    flex: 1,
    width: '80%',
  },
  listSmallContainer: {
    flex: 1,
    width: '60%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderWidth: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
