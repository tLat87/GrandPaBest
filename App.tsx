import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, View, Text, Platform } from 'react-native';
import { HomeScreen } from './src/grandPaBestScreens/HomeScreen';
import { CalendarScreen } from './src/grandPaBestScreens/CalendarScreen';
import { StatisticsScreen } from './src/grandPaBestScreens/StatisticsScreen';
import { TaskSelectionScreen } from './src/grandPaBestScreens/TaskSelectionScreen';
import { TimerScreen } from './src/grandPaBestScreens/TimerScreen';
import { OnboardingFlow } from './src/grandPaBestScreens/OnboardingFlow';
import { TabBarIcon } from './src/grandPaBestComponents/TabBarIcon';
import { CustomTabBar } from './src/grandPaBestComponents/CustomTabBar';
import { COLORS } from './src/grandPaBestConstants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  // Пути к иконкам навигации - замените на реальные пути
  const iconPaths = {
    homeActive: require('./src/assets/img/bottom/1.png'), // Укажите путь к PNG для активной иконки дома
    homeInactive: require('./src/assets/img/bottom/1.png'), // Укажите путь к PNG для неактивной иконки дома
    calendarActive: require('./src/assets/img/bottom/2.png'), // Укажите путь к PNG для активной иконки календаря
    calendarInactive: require('./src/assets/img/bottom/2.png'), // Укажите путь к PNG для неактивной иконки календаря
    statisticsActive: require('./src/assets/img/bottom/3.png'), // Укажите путь к PNG для активной иконки статистики
    statisticsInactive: require('./src/assets/img/bottom/3.png'), // Укажите путь к PNG для неактивной иконки статистики
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.lightGreen,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.darkGreen,
        tabBarLabelStyle: {
          fontSize: 0, // Скрываем текст, используем только иконки
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={iconPaths.homeActive}
              inactiveIcon={iconPaths.homeInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={iconPaths.calendarActive}
              inactiveIcon={iconPaths.calendarInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={iconPaths.statisticsActive}
              inactiveIcon={iconPaths.statisticsInactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Пути к изображениям онбординга - замените на реальные пути
  // Для локальных файлов используйте require('./path/to/image.png')
  // Для URL используйте строку с адресом
  const onboardingImagePaths = {
    screen1: undefined, // Например: require('./assets/onboarding1.png') или 'https://example.com/image1.png'
    screen2: undefined, // Например: require('./assets/onboarding2.png') или 'https://example.com/image2.png'
    screen3: undefined, // Например: require('./assets/onboarding3.png') или 'https://example.com/image3.png'
  };

  if (showOnboarding) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <OnboardingFlow
          onComplete={() => setShowOnboarding(false)}
          imagePaths={onboardingImagePaths}
        />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="TaskSelection" component={TaskSelectionScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;