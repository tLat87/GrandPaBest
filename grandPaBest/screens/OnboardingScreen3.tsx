import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface OnboardingScreen3Props {
  onStart: () => void;
  imagePath?: string | number;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({ onStart, imagePath }) => {
  const imageSource = imagePath 
    ? (typeof imagePath === 'number' ? imagePath : { uri: imagePath })
    : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image source={require('../grandPaBestAssets/img/onboard/3.png')} style={styles.image} resizeMode="contain" />
  
      </View>
      
      <View style={styles.panel}>
        <Text style={styles.title}>Each artifact stores your statistics:</Text>
        <Text style={styles.description}>
          focus, energy, and productivity. Your path to mastery begins here.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start</Text>
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
    width: '130%',
    marginTop: -100,

    height: '140%',
  },
  placeholder: {
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A1F2A',
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
