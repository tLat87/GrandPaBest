import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../grandPaBestComponents/Header';
import { COLORS } from '../grandPaBestConstants/colors';
import { storageService } from '../grandPaBestServices/storage';
import { ARTIFACTS } from '../grandPaBestConstants/artifacts';
import { TASKS } from '../grandPaBestConstants/artifacts';
import { ArtifactProgress } from '../grandPaBestTypes/index';

export const StatisticsScreen = () => {
  const [stats, setStats] = useState<ArtifactProgress[]>([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    const completedTasks = await storageService.getCompletedTasks();
    const artifactStats: ArtifactProgress[] = ARTIFACTS.map((artifact) => {
      const artifactTasks = completedTasks.filter(t => t.artifactId === artifact.id);
      const totalTasks = TASKS.filter(t => t.artifactId === artifact.id).length;
      const completed = artifactTasks.length;

      return {
        artifactId: artifact.id,
        totalTasks,
        completedTasks: completed,
        uncompletedTasks: totalTasks - completed,
      };
    });

    setStats(artifactStats);
  };

  const getProgressPercentage = (progress: ArtifactProgress) => {
    if (progress.totalTasks === 0) return 0;
    return (progress.completedTasks / progress.totalTasks) * 100;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.screenTitle}>Statistics</Text>
        {ARTIFACTS.map((artifact) => {
          const progress = stats.find(s => s.artifactId === artifact.id);
          if (!progress) return null;

          const percentage = getProgressPercentage(progress);

          return (
            <View key={artifact.id} style={styles.statCard}>
              <View style={styles.artifactHeader}>
                <Image source={artifact.icon} style={styles.artifactIcon} resizeMode="contain" />
                <Text style={styles.artifactName}>{artifact.name}</Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${percentage}%` }]} />
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue}>{progress.totalTasks}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Completed</Text>
                  <Text style={[styles.statValue, styles.completedStat]}>{progress.completedTasks}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Remaining</Text>
                  <Text style={styles.statValue}>{progress.uncompletedTasks}</Text>
                </View>
              </View>

              <Text style={styles.percentageText}>{percentage.toFixed(0)}% Complete</Text>
            </View>
          );
        })}
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
  statCard: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  artifactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  artifactIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  artifactName: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    flex: 1,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: COLORS.background,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.accent,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  completedStat: {
    color: COLORS.lightGreen,
  },
  percentageText: {
    fontSize: 14,
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: 5,
  },
});
