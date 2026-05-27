import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TaskItem = ({ item }) => {
  const { done, title, description } = item; // Деструктуризація для чистоти коду

  return (
    <View style={[itemStyles.card, done && itemStyles.cardCompleted]}>
      <View style={itemStyles.headerRow}>
        <Text style={itemStyles.headline}>{title}</Text>
        <Text style={[itemStyles.badge, done ? itemStyles.badgeDone : itemStyles.badgeActive]}>
          {done ? '✓ Готово' : 'В процесі'}
        </Text>
      </View>
      <Text style={itemStyles.details}>{description}</Text>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12, // Трохи гостріші кути
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5, // Зроблено рамку товщою
    borderColor: '#E4E7EB',
  },
  cardCompleted: {
    borderColor: '#40C057',
    backgroundColor: '#F2FCF5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  badgeActive: {
    backgroundColor: '#F0F4F8',
    color: '#486581',
  },
  badgeDone: {
    backgroundColor: '#D3F9D8',
    color: '#2B8A3E',
  },
  headline: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#102A43',
    flex: 1, // Щоб текст не наїжджав на бедж
  },
  details: {
    fontSize: 13,
    color: '#627D98',
    lineHeight: 18, // Покращено читабельність
  },
});

export default TaskItem;