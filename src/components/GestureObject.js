import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const GestureObject = ({
  onSingleTap,
  onDoubleTap,
  onLongPress,
  onDragComplete,
  onFlingLeft,
  onFlingRight,
  onPinch,
}) => {
  const doubleTapNode = useRef(null);

  // Використовуємо інші назви для анімацій
  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;
  const initialScale = useRef(new Animated.Value(1)).current;
  const currentPinch = useRef(new Animated.Value(1)).current;

  const handlePanEvent = Animated.event(
    [{ nativeEvent: { translationX: moveX, translationY: moveY } }],
    { useNativeDriver: false }
  );

  const handlePanState = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.BEGAN) {
      moveX.setOffset(nativeEvent.translationX);
      moveY.setOffset(nativeEvent.translationY);
      moveX.setValue(0);
      moveY.setValue(0);
    }
    if (nativeEvent.oldState === State.ACTIVE) {
      onDragComplete();
    }
  };

  const handlePinchEvent = Animated.event(
    [{ nativeEvent: { scale: currentPinch } }],
    { useNativeDriver: false }
  );

  const handlePinchState = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      // Трохи змінена логіка обмеження масштабу
      const newScale = Math.min(Math.max(nativeEvent.scale, 0.7), 2.0);
      initialScale.setValue(newScale);
      currentPinch.setValue(1);
      onPinch();
    }
  };

  const combinedScale = Animated.multiply(initialScale, currentPinch);

  // Спрощені обробники кліків
  const checkSingleTap = (e) => e.nativeEvent.state === State.ACTIVE && onSingleTap();
  const checkDoubleTap = (e) => e.nativeEvent.state === State.ACTIVE && onDoubleTap();
  const checkLongPress = (e) => e.nativeEvent.state === State.ACTIVE && onLongPress();

  return (
    <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={onFlingRight}>
      <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={onFlingLeft}>
        <PanGestureHandler onGestureEvent={handlePanEvent} onHandlerStateChange={handlePanState}>
          <Animated.View style={design.wrapper}>
            <PinchGestureHandler onGestureEvent={handlePinchEvent} onHandlerStateChange={handlePinchState}>
              <Animated.View
                collapsable={false}
                style={[
                  design.actionArea,
                  { transform: [{ translateX: moveX }, { translateY: moveY }, { scale: combinedScale }] },
                ]}
              >
                <TapGestureHandler onHandlerStateChange={checkSingleTap} waitFor={doubleTapNode}>
                  <TapGestureHandler
                    ref={doubleTapNode}
                    numberOfTaps={2}
                    onHandlerStateChange={checkDoubleTap}
                  >
                    <LongPressGestureHandler minDurationMs={3000} onHandlerStateChange={checkLongPress}>
                      <Animated.View style={design.targetSphere}>
                        <Text style={design.sphereText}>Натисни</Text>
                      </Animated.View>
                    </LongPressGestureHandler>
                  </TapGestureHandler>
                </TapGestureHandler>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const design = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  actionArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetSphere: {
    width: 160, // Змінено розміри
    height: 160,
    borderRadius: 80,
    backgroundColor: '#1A4B6B', // Трохи змінено відтінок
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#DDF0FF',
  },
  sphereText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default GestureObject;