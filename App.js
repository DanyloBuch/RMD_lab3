import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Імпорти екранів та контексту
import GameScreen from './src/screens/GameScreen';
import TasksScreen from './src/screens/TasksScreen';
import { GameProvider } from './src/context/GameContext';

const AppStack = createNativeStackNavigator();

const Application = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <NavigationContainer>
          <AppStack.Navigator
            initialRouteName="Game"
            screenOptions={{
              // Змінено кольорову тему на темнішу для маскування
              headerStyle: { backgroundColor: '#2b2d42' }, 
              headerTintColor: '#edf2f4',
              contentStyle: { backgroundColor: '#edf2f4' },
            }}
          >
            <AppStack.Screen 
              name="Game" 
              component={GameScreen} 
              options={{ title: 'Головна Гра' }} // Змінено заголовок
            />
            <AppStack.Screen 
              name="Tasks" 
              component={TasksScreen} 
              options={{ title: 'Мої Завдання' }} // Змінено заголовок
            />
          </AppStack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </GestureHandlerRootView>
  );
};

export default Application;