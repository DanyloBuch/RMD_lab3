import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { State } from 'react-native-gesture-handler';

import GestureObject from '../components/GestureObject';
import ScoreBoard from '../components/ScoreBoard';
import { useGame } from '../context/GameContext';

const GameScreen = ({ navigation }) => {
  const {
    score,
    tapCount,
    doubleTapCount,
    onTap,
    onDoubleTap,
    onLongPress,
    onDrag,
    onFling,
    onPinch,
  } = useGame();

  const processSwipe = (dir) => (evt) => {
    if (evt.nativeEvent.state === State.ACTIVE) {
      const pointsGot = onFling(dir);
      const directionText = dir === 'right' ? 'праворуч' : 'ліворуч';
      Alert.alert('Різкий рух!', `Отримано балів: +${pointsGot} за свайп ${directionText}.`);
    }
  };

  return (
    <View style={screenTheme.mainWrapper}>
      <ScoreBoard score={score} tapCount={tapCount} doubleTapCount={doubleTapCount} />

      <View style={screenTheme.infoBox}>
        <Text style={screenTheme.infoDesc}>
          Взаємодій з фігурою: звичайний або подвійний тап, утримання (3с), свайпи, перетягування та щипок (pinch).
        </Text>
      </View>

      <View style={screenTheme.interactionZone}>
        <GestureObject
          onSingleTap={onTap}
          onDoubleTap={onDoubleTap}
          onLongPress={onLongPress}
          onDragComplete={onDrag}
          onFlingRight={processSwipe('right')}
          onFlingLeft={processSwipe('left')}
          onPinch={onPinch}
        />
      </View>

      <TouchableOpacity activeOpacity={0.8} style={screenTheme.actionBtn} onPress={() => navigation.navigate('Tasks')}>
        <Text style={screenTheme.btnLabel}>Переглянути мої завдання</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenTheme = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    alignItems: 'center',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#D1E8E2',
    borderRadius: 12,
    marginTop: 15,
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#197278', // Стильна лінія збоку
  },
  infoDesc: {
    color: '#283618',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
  },
  interactionZone: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#197278',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnLabel: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default GameScreen;