import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS } from '../grandPaBestConstants/colors';

interface TabBarIconProps {
  focused: boolean;
  activeIcon: any; // require() для активной иконки
  inactiveIcon: any; // require() для неактивной иконки
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, activeIcon, inactiveIcon }) => {
  return (
    <View style={styles.container}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        style={styles.icon}
        resizeMode="contain"
      />
      {focused && <View style={styles.indicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.darkGreen,
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -3,
  },
});
