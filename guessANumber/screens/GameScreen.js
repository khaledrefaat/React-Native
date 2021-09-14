import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if (randNum === exclude) return generateRandomBetween(min, max, exclude);

  return randNum;
};

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) onGameOver(rounds);
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
      : (currentLow.current = currentGuess);

    const nextNumber = generateRandomBetween(
      currentHigh.current,
      currentLow.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(currRound => currRound + 1);
  };
  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer styke={styles.NumberContainer}>
        {currentGuess}
      </NumberContainer>
      <Card style={styles.card}>
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
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    width: 300,
    maxWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  NumberContainer: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  button: {
    width: '35%',
  },
});
