import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Alert, ScrollView, FlatList } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if (randNum === exclude) return generateRandomBetween(min, max, exclude);
  console.log(randNum);
  return randNum;
};

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice).toString();
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGusses, setPastGusses] = useState([initialGuess]);

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
    setCurrentGuess(nextNumber);
    setPastGusses(currentGuesses => [nextNumber.toString(), ...currentGuesses]);
  };

  const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );

  console.log(pastGusses);

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
      <View style={styles.listContainer}>
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
  listContainer: {
    width: '80%',
    flex: 1,
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
    justifyContent: 'space-around',
    width: '100%',
  },
});
