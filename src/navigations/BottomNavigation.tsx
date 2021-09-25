import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '_types';
import {
    HomeScreen,
    FavoriteScreen
} from '../screens';
import IconFA from 'react-native-vector-icons/FontAwesome5';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#2f95dc',
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof IconFA>['name'];
    color: string;
}) {
    return <IconFA solid size={20} {...props} />;
}

export default BottomTabNavigator