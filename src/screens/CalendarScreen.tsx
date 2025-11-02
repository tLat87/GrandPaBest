import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { COLORS } from '../constants/colors';
import { storageService } from '../services/storage';
import { TASKS, ARTIFACTS } from '../constants/artifacts';
import { DailyTask } from '../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDaysInMonth, startOfWeek, endOfWeek, isSameDay } from 'date-fns';

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [monthDates, setMonthDates] = useState<Date[]>([]);

  useEffect(() => {
    generateMonthDates();
    loadDailyTasks();
  }, [selectedDate]);

  const generateMonthDates = () => {
    const start = startOfWeek(startOfMonth(selectedDate));
    const end = endOfWeek(endOfMonth(selectedDate));
    const dates = eachDayOfInterval({ start, end });
    setMonthDates(dates);
  };

  const loadDailyTasks = async () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const tasks = await storageService.getDailyTasks(dateStr);
    setDailyTasks(tasks);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };


  const getDayStyle = (date: Date) => {
    const isSelected = isSameDay(date, selectedDate);
    return [styles.dayCell, isSelected && styles.selectedDay];
  };

  const getDayTextStyle = (date: Date) => {
    const isSelected = isSameDay(date, selectedDate);
    const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
    return [
      styles.dayText,
      isSelected && styles.selectedDayText,
      !isCurrentMonth && styles.otherMonthText,
    ];
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.monthTitle}>{format(selectedDate, 'MMMM yyyy')}</Text>
        
        <View style={styles.calendarGrid}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.weekdayLabel}>
              {day}
            </Text>
          ))}
          {monthDates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={getDayStyle(date)}
              onPress={() => handleDateSelect(date)}
            >
              <Text style={getDayTextStyle(date)}>{format(date, 'd')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tasksContainer}>
          {dailyTasks.length === 0 ? (
            <Text style={styles.noDataText}>No data for this day</Text>
          ) : (
            <>
              {dailyTasks.map((task, index) => {
                const artifact = ARTIFACTS.find(a => a.id === task.artifactId);
                return (
                  <View key={index} style={styles.taskCard}>
                    {artifact && (
                      <Image source={artifact.icon} style={styles.taskIcon} resizeMode="contain" />
                    )}
                    <Text style={styles.taskTitle}>{task.title}</Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 25,
    paddingBottom: Platform.OS === 'ios' ? 130 : 125,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  monthTitle: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  weekdayLabel: {
    width: '14.28%',
    textAlign: 'center',
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGreen,
    marginBottom: 5,
  },
  selectedDay: {
    backgroundColor: COLORS.lightGreen,
  },
  dayText: {
    color: COLORS.white,
    fontSize: 14,
  },
  selectedDayText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  otherMonthText: {
    opacity: 0.3,
  },
  tasksContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  noDataText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  taskIcon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  taskTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
  },
});
