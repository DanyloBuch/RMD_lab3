import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import TaskItem from '../components/TaskItem';
import { useGame } from '../context/GameContext';

const TasksScreen = () => {
  const { tasks, completedTasks } = useGame();

  // Винесений рендер-метод (краща практика React Native)
  const renderTask = ({ item }) => <TaskItem item={item} />;

  return (
    <View style={layout.pageContainer}>
      <View style={layout.headerSection}>
        <Text style={layout.mainHeading}>Місії</Text>
        <Text style={layout.progressText}>
          Твій прогрес: {completedTasks} з {tasks.length}
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()} // toString для надійності
        renderItem={renderTask}
        contentContainerStyle={layout.scrollArea}
        showsVerticalScrollIndicator={false} // Ховаємо скролбар для краси
      />
    </View>
  );
};

const layout = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerSection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
  },
  mainHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#243B53',
  },
  progressText: {
    fontSize: 16,
    color: '#829AB1',
    marginTop: 4,
    fontWeight: '600',
  },
  scrollArea: {
    paddingBottom: 30,
  },
});

export default TasksScreen;