import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface OnboardingScreen1Props {
  onNext: () => void;
  imagePath?: string | number;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ onNext, imagePath }) => {
  const imageSource = imagePath 
    ? (typeof imagePath === 'number' ? imagePath : { uri: imagePath })
    : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image source={require('../assets/img/onboard/1.png')} style={styles.image} resizeMode="contain" />
  
      </View>
      
      <View style={styles.panel}>
        <Text style={styles.title}>Three ancient artifacts await you.</Text>
        <Text style={styles.description}>
          Each carries the power of focus, energy, or action. Choose the one that matches your mood today and begin the journey of challenges.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#3D2F2F',
    // paddingHorizontal: 20,
    // paddingTop: 60,
  },
  image: {
    width: '120%',
    marginTop: -20,

    height: '120%',
  },
  placeholder: {
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A1F1F',
    borderRadius: 20,
  },
  placeholderText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderSubtext: {
    color: COLORS.accent,
    fontSize: 16,
  },
  panel: {
    backgroundColor: COLORS.darkGreen,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingBottom: 50,
    minHeight: height * 0.35,
  },
  title: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.white,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
