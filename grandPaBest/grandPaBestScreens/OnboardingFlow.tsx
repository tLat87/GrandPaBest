import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { OnboardingScreen1 } from './OnboardingScreen1';
import { OnboardingScreen2 } from './OnboardingScreen2';
import { OnboardingScreen3 } from './OnboardingScreen3';
import { COLORS } from '../grandPaBestConstants/colors';

interface OnboardingFlowProps {
  onComplete: () => void;
  imagePaths?: {
    screen1?: string | number;
    screen2?: string | number;
    screen3?: string | number;
  };
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, imagePaths }) => {
  const [currentScreen, setCurrentScreen] = useState(2);

  const handleNext = () => {
    if (currentScreen < 3) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const handleStart = () => {
    onComplete();
  };

  return (
    <View style={styles.container}>
      {/* {currentScreen === 1 && (
        <OnboardingScreen1 onNext={handleNext} imagePath={imagePaths?.screen1} />
      )} */}
      {currentScreen === 2 && (
        <OnboardingScreen2 onNext={handleNext} imagePath={imagePaths?.screen2} />
      )}
      {currentScreen === 3 && (
        <OnboardingScreen3 onStart={handleStart} imagePath={imagePaths?.screen3} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
