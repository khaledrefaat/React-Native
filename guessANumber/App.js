import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () =>
  Font.loadAsync({
    montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );

  const startGameHandler = selectedNumber => setUserNumber(selectedNumber);

  const onGameOverHandler = rounds => setGuessRounds(rounds);

  const onNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let renderContent = <StartGame onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0)
    renderContent = (
      <GameScreen userChoice={userNumber} onGameOver={onGameOverHandler} />
    );
  else if (guessRounds > 0)
    renderContent = (
      <GameOverScreen
        startNewGame={onNewGameHandler}
        userChoice={userNumber}
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
    flex: 1,
  },
});

export default App;
