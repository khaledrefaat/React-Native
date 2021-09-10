import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = selectedNumber => setUserNumber(selectedNumber);

  const onGameOverHandler = rounds => setGuessRounds(rounds);

  const onNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let renderContent = <StartGame onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0)
    renderContent = (
      <GameScreen
        onRestartGame={onNewGameHandler}
        userChoice={userNumber}
        onGameOver={onGameOverHandler}
      />
    );
  else if (guessRounds > 0)
    renderContent = (
      <GameOverScreen
        startNewGame={onNewGameHandler}
        gameRounds={guessRounds}
      />
    );
  return (
    <View style={styles.container}>
      <Header title="Guess A Number" />
      {renderContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
