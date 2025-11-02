import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../grandPaBestComponents/Header';
import { COLORS } from '../grandPaBestConstants/colors';
import { ARTIFACTS } from '../grandPaBestConstants/artifacts';
import { TASKS } from '../grandPaBestConstants/artifacts';
import { storageService } from '../grandPaBestServices/storage';
import { Artifact, ArtifactProgress } from '../grandPaBestTypes/index';
import { format } from 'date-fns';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [progress, setProgress] = useState<ArtifactProgress | null>(null);

  useEffect(() => {
    loadProgress();
  }, [selectedArtifact]);

  const loadProgress = async () => {
    if (!selectedArtifact) {
      setProgress(null);
      return;
    }

    const completedTasks = await storageService.getCompletedTasks();
    const artifactTasks = completedTasks.filter(t => t.artifactId === selectedArtifact.id);
    const totalTasks = TASKS.filter(t => t.artifactId === selectedArtifact.id).length;
    const completed = artifactTasks.length;

    setProgress({
      artifactId: selectedArtifact.id,
      totalTasks,
      completedTasks: completed,
      uncompletedTasks: totalTasks - completed,
    });
  };

  const handleArtifactSelect = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
  };

  const handleStartTask = () => {
    if (selectedArtifact) {
      navigation.navigate('TaskSelection', { artifact: selectedArtifact });
    }
  };

  const handleViewArtifact = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
  };

  if (!selectedArtifact) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header />
        <View style={styles.content}>
          <Text style={styles.screenTitle}>Choose a category</Text>
          <ScrollView style={styles.categoriesList}>
            {ARTIFACTS.map((artifact) => (
              <TouchableOpacity
                key={artifact.id}
                style={styles.categoryCard}
                onPress={() => handleArtifactSelect(artifact)}
              >
                <Image source={artifact.icon} style={styles.categoryIcon} resizeMode="contain" />
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{artifact.name}</Text>
                  <Text style={styles.categoryDescription}>{artifact.description}</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleArtifactSelect(artifact)}
                >
                  <Text style={styles.selectButtonText}>→</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.artifactCard}>
          <Image source={selectedArtifact.icon} style={styles.artifactIcon} resizeMode="contain" />
          <Text style={styles.artifactName}>{selectedArtifact.name}</Text>
        </View>

        {progress && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Total tasks: {progress.totalTasks}</Text>
            <Text style={styles.statsText}>Completed tasks: {progress.completedTasks}</Text>
            <Text style={styles.statsText}>Uncompleted tasks: {progress.uncompletedTasks}</Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleStartTask}>
            <Text style={styles.nextButtonText}>→</Text>
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
  screenTitle: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  categoriesList: {
    flex: 1,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: COLORS.accent,
  },
  selectButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  artifactCard: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  artifactIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  artifactName: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
