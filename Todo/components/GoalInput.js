import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Modal } from 'react-native';

const GoalInput = ({ placeholder, addGoal, isVisible, hideModal }) => {
  const [goalEnterd, setGoalEnterd] = useState('');

  return (
    <Modal style={styles.modal} visible={isVisible} animationType="slide">
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          onChangeText={term => setGoalEnterd(term)}
          value={goalEnterd}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button onPress={() => addGoal(goalEnterd)} title="Add" />
          </View>
          <View style={styles.button}>
            <Button onPress={hideModal} title="Cancel" color="#e84118" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},

  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    width: '80%',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    width: '40%',
  },
});

export default GoalInput;
