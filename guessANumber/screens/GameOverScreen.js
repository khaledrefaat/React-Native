import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Game Over</Text>
      <Text>Game Rounds: {props.gameRounds}</Text>
      <Button title="Start a NewGame" onPress={props.startNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameOverScreen;
