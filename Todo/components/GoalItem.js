import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const GoalItem = ({ value, deleteGoal, index }) => {
  return (
    <TouchableOpacity onPress={() => deleteGoal(index)}>
      <View style={styles.goal}>
        <Text style={{ textTransform: 'capitalize' }}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#ccc',
    padding: 15,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default GoalItem;
