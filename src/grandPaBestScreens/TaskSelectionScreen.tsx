import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../grandPaBestComponents/Header';
import { COLORS } from '../grandPaBestConstants/colors';
import { TASKS, ARTIFACTS } from '../grandPaBestConstants/artifacts';
import { Artifact, Task } from '../grandPaBestTypes/index';

export const TaskSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { artifact } = route.params as { artifact: Artifact };
  const [tasks] = useState<Task[]>(TASKS.filter(t => t.artifactId === artifact.id));

  const handleTaskSelect = (task: Task) => {
    navigation.navigate('Timer', { artifact, task });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.artifactCard}>
          <Image source={artifact.icon} style={styles.artifactIcon} resizeMode="contain" />
          <Text style={styles.artifactName}>{artifact.name}</Text>
        </View>

        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => handleTaskSelect(task)}
          >
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={styles.durationContainer}>
              <Image 
                source={require('../assets/img/clock.png')} // Укажите путь к PNG иконке часов
                style={styles.clockIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.durationText}>{task.duration}:00</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
    
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
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  artifactIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  artifactName: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  taskTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  clockIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  durationText: {
    color: COLORS.white,
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
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
  hintButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
