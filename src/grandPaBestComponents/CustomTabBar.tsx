import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { COLORS } from '../grandPaBestConstants/colors';

export const CustomTabBar = (props: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <BottomTabBar {...props} />
      <View style={styles.gestureIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  gestureIndicator: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.white,
    borderRadius: 2,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 8 : 4,
    alignSelf: 'center',
  },
});
