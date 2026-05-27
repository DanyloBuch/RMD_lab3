import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ScoreBoard = ({ score, tapCount, doubleTapCount }) => {
  return (
    <View style={boardStyles.panel}>
      <Text style={boardStyles.title}>Загальний рахунок</Text>
      <Text style={boardStyles.points}>{score}</Text>
      
      <View style={boardStyles.statsWrapper}>
        <Text style={boardStyles.statItem}>Кліки: {tapCount}</Text>
        <Text style={boardStyles.statItem}>Подвійні: {doubleTapCount}</Text>
      </View>
    </View>
  );
};

const boardStyles = StyleSheet.create({
  panel: {
    width: '95%', // Зроблено адаптивнішим
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    alignSelf: 'center', // Додано центрування
    elevation: 4, // Змінено тінь для Android
    shadowColor: '#102a43',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 15,
    color: '#627D98',
    textTransform: 'uppercase', // Змінено стиль тексту
    letterSpacing: 1,
    marginBottom: 5,
  },
  points: {
    fontSize: 46, // Трохи збільшено шрифт
    fontWeight: '800',
    color: '#000000',
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Змінено позиціонування
    width: '80%',
    marginTop: 10,
  },
  statItem: {
    color: '#334E68',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ScoreBoard;