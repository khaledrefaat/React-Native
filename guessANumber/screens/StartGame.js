import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

import Colors from '../constants/colors';

const StartGame = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numperInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue('');
  };

  const confirmInputHandler = () => {
    const chooseNumber = parseInt(enteredValue);
    if (!chooseNumber || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
    }
    console.log(chooseNumber);
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chooseNumber);
    Keyboard.dismiss();
  };

  let confirmedNumber = confirmed && (
    <Card style={styles.selectedNumberCard}>
      <Text>Choose Number:</Text>
      <NumberContainer style={styles.selectedNumber}>
        {selectedNumber}
      </NumberContainer>
      <Button onPress={() => onStartGame(selectedNumber)} title="Start Game" />
    </Card>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>start a new game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select A Number</Text>
          <Input
            autoCorrect={false}
            maxLength={2}
            keyboardType="numeric"
            blurOnSubmit
            style={styles.input}
            onChangeText={numperInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedNumber}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {},
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
  selectedNumberCard: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  selectedNumber: {
    width: 50,
    textAlign: 'center',
  },
});
