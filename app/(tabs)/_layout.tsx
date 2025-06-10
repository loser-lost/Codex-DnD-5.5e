import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Stack, Tabs } from 'expo-router';
import { useTheme } from '@ui-kitten/components';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <><Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme['color-basic-1000'] },
      }}
    >
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Magias',
          tabBarActiveTintColor: theme['color-primary-500'],
          tabBarLabelStyle: { fontFamily: 'Inter' },
          tabBarIcon: ({ color }) => <FontAwesome6 name="book-quran" size={28} color={color} />
        }} />
      <Tabs.Screen
        name="monsters"
        options={{
          title: 'Monstros',
          tabBarActiveTintColor: theme['color-primary-500'],
          tabBarLabelStyle: { fontFamily: 'Inter' },
          tabBarIcon: ({ color }) => <FontAwesome6 name="dragon" size={25} color={color} />
        }} />
      <Tabs.Screen
        name="characters"
        options={{
          title: 'Fichas',
          tabBarActiveTintColor: theme['color-primary-500'],
          tabBarLabelStyle: { fontFamily: 'Inter' },
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="address-book" color={color} />
        }} />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarActiveTintColor: theme['color-primary-500'],
          tabBarLabelStyle: { fontFamily: 'Inter' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />
        }} />
    </Tabs>
        <Stack.Screen
          name="SpellDetails"
          options={{ presentation: 'modal',
          headerShown: false, animation: 'slide_from_bottom',
        }} />
        
      </>
          
  
  );

}
