import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/colors';

export const Header = () => {
  // Укажите путь к логотипу PNG
  const logoIcon = require('../assets/img/logo.png'); // Укажите путь к PNG

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Welcome to Grand path best</Text>
      <View style={styles.logoContainer}>
        <Image source={logoIcon} style={styles.logoIcon} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logoIcon: {
    width: 50,
    height: 50,
  },
  logoText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
