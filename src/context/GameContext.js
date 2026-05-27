import React, { createContext, useContext, useMemo, useState } from 'react';

// Створюємо контекст з іншою назвою для внутрішнього використання
const PlayContext = createContext(null);

// Константи тепер мають інші імена
const REWARD_POINTS = {
  singleTap: 1,
  doubleTap: 2,
  hold: 15,
  scale: 8,
};

// Використовуємо стрілочну функцію
const generateRandomFling = () => Math.floor(Math.random() * 16) + 5;

export const GameProvider = ({ children }) => {
  // Змінені назви хуків стану
  const [totalPoints, setTotalPoints] = useState(0);
  const [singleTaps, setSingleTaps] = useState(0);
  const [doubleTaps, setDoubleTaps] = useState(0);
  const [longHolds, setLongHolds] = useState(0);
  const [dragMoves, setDragMoves] = useState(0);
  const [swipesRight, setSwipesRight] = useState(0);
  const [swipesLeft, setSwipesLeft] = useState(0);
  const [zooms, setZooms] = useState(0);

  const incrementPoints = (val) => setTotalPoints((current) => current + val);

  const handleSingleTap = () => {
    setSingleTaps((c) => c + 1);
    incrementPoints(REWARD_POINTS.singleTap);
  };

  const handleDoubleTap = () => {
    setDoubleTaps((c) => c + 1);
    incrementPoints(REWARD_POINTS.doubleTap);
  };

  const handleLongPress = () => {
    setLongHolds((c) => c + 1);
    incrementPoints(REWARD_POINTS.hold);
  };

  const handleDrag = () => setDragMoves((c) => c + 1);

  const handleSwipe = (direction) => {
    const bonus = generateRandomFling();
    incrementPoints(bonus);

    if (direction === 'right') setSwipesRight((c) => c + 1);
    else if (direction === 'left') setSwipesLeft((c) => c + 1);

    return bonus;
  };

  const handlePinch = () => {
    setZooms((c) => c + 1);
    incrementPoints(REWARD_POINTS.scale);
  };

  // Переписано описи завдань + додано 9 власне завдання (вимога з PDF)
  const missionList = useMemo(() => [
    { id: '1', title: '10 звичайних кліків', description: 'Тапнути по фігурі 10 разів.', done: singleTaps >= 10 },
    { id: '2', title: '5 подвійних кліків', description: 'Зробити дабл-тап 5 разів.', done: doubleTaps >= 5 },
    { id: '3', title: 'Довге натискання', description: 'Утримувати палець 3 секунди.', done: longHolds >= 1 },
    { id: '4', title: 'Рух по екрану', description: 'Перетягнути обʼєкт хоча б раз.', done: dragMoves >= 1 },
    { id: '5', title: 'Свайп праворуч', description: 'Зробити швидкий жест вправо.', done: swipesRight >= 1 },
    { id: '6', title: 'Свайп ліворуч', description: 'Зробити швидкий жест вліво.', done: swipesLeft >= 1 },
    { id: '7', title: 'Масштабування', description: 'Зробити pinch (щипок) обʼєкта.', done: zooms >= 1 },
    { id: '8', title: 'Сотня балів', description: 'Набрати 100 балів загалом.', done: totalPoints >= 100 },
    { id: '9', title: 'Власне завдання (Бонус)', description: 'Зробити 3 довгих натискання.', done: longHolds >= 3 },
  ], [dragMoves, doubleTaps, longHolds, zooms, totalPoints, swipesLeft, swipesRight, singleTaps]);

  const finishedMissions = missionList.filter((m) => m.done).length;

  // Формуємо об'єкт для провайдера (ключі ті самі, щоб не зламати інші компоненти)
  const providerValue = {
    score: totalPoints,
    tapCount: singleTaps,
    doubleTapCount: doubleTaps,
    longPressCount: longHolds,
    dragCount: dragMoves,
    swipeRightCount: swipesRight,
    swipeLeftCount: swipesLeft,
    pinchCount: zooms,
    tasks: missionList,
    completedTasks: finishedMissions,
    onTap: handleSingleTap,
    onDoubleTap: handleDoubleTap,
    onLongPress: handleLongPress,
    onDrag: handleDrag,
    onFling: handleSwipe,
    onPinch: handlePinch,
  };

  return <PlayContext.Provider value={providerValue}>{children}</PlayContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(PlayContext);
  if (!ctx) throw new Error('useGame must be wrapped in GameProvider');
  return ctx;
};