import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ScrollView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../grandPaBestComponents/Header';
import { COLORS } from '../grandPaBestConstants/colors';
import { storageService } from '../grandPaBestServices/storage';
import { Artifact, Task } from '../grandPaBestTypes/index';
import { format } from 'date-fns';

type TimerState = 'idle' | 'running' | 'completed';

export const TimerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { artifact, task } = route.params as { artifact: Artifact; task: Task };

  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeRemaining, setTimeRemaining] = useState(task.duration * 60); // in seconds
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timerState === 'running' && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState, timeRemaining]);

  useEffect(() => {
    const totalSeconds = task.duration * 60;
    const elapsed = totalSeconds - timeRemaining;
    const newProgress = elapsed / totalSeconds;
    setProgress(newProgress);

    Animated.timing(progressAnim, {
      toValue: newProgress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [timeRemaining, task.duration]);

  const handleStart = () => {
    setTimerState('running');
  };

  const handleComplete = async () => {
    const completedTask = {
      id: Date.now().toString(),
      taskId: task.id,
      artifactId: artifact.id,
      date: format(new Date(), 'yyyy-MM-dd'),
      completedAt: Date.now(),
    };

    await storageService.saveCompletedTask(completedTask);

    // Update daily tasks
    const dateStr = format(new Date(), 'yyyy-MM-dd');
    const dailyTasks = await storageService.getDailyTasks(dateStr);
    const existingTask = dailyTasks.find(t => t.taskId === task.id);
    
    if (!existingTask) {
      dailyTasks.push({
        taskId: task.id,
        artifactId: artifact.id,
        title: task.title,
        duration: task.duration,
        completed: true,
      });
      await storageService.saveDailyTasks(dateStr, dailyTasks);
    } else {
      existingTask.completed = true;
      await storageService.saveDailyTasks(dateStr, dailyTasks);
    }

    navigation.navigate('Home');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = task.duration * 60;
  const circumference = 2 * Math.PI * 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.artifactCard}>
          <Image source={artifact.icon} style={styles.artifactIcon} resizeMode="contain" />
          <Text style={styles.artifactName}>{artifact.name}</Text>
        </View>

        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </View>

        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <View style={styles.timerInner}>
              {timerState === 'idle' && (
                <Text style={styles.timerText}>Start timer</Text>
              )}
              {timerState === 'running' && (
                <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
              )}
              {timerState === 'completed' && (
                <Text style={styles.timerText}>Time is up.</Text>
              )}
            </View>
            <View
              style={[
                styles.progressRing,
                { transform: [{ rotate: '-90deg' }] },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          {timerState === 'idle' && (
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          {timerState === 'idle' && (
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          )}
          {timerState === 'completed' && (
            <>
              <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
                <Text style={styles.completeButtonText}>✓</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>✕</Text>
              </TouchableOpacity>
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
  artifactCard: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  artifactIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  artifactName: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },
  taskTitle: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
  },
  timerContainer: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 15,
    borderColor: COLORS.lightGreen,
  },
  timerInner: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRing: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 15,
    borderColor: COLORS.lightGreen,
  },
  progressFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 125,
  },
  timerText: {
    fontSize: 24,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    flex: 1,
    marginLeft: 20,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  completeButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
