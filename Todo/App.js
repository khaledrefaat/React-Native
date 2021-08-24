import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goal, setGoal] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const hideModal = () => setIsVisible(false);

  const addGoalHandler = goalEnterd => {
    setGoal(currentGoal => [
      ...currentGoal,
      { key: Math.floor(Math.random() * 10000).toString(), value: goalEnterd },
    ]);
    hideModal();
  };

  const deleteGoal = deleteGoalIndex =>
    setGoal(currentGoal =>
      currentGoal.filter((goal, index) => index !== deleteGoalIndex)
    );

  return (
    <View style={styles.container}>
      <Button title="Add Goal" onPress={() => setIsVisible(true)} />
      <GoalInput
        placeholder="Add Goal"
        style={styles.input}
        addGoal={addGoalHandler}
        isVisible={isVisible}
        hideModal={hideModal}
      />
      <FlatList
        data={goal}
        renderItem={itemData => (
          <GoalItem
            value={itemData.item.value}
            index={itemData.index}
            deleteGoal={deleteGoal}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});
