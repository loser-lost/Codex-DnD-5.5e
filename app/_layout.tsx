//* React Imports
import { useEffect } from 'react';
import React from 'react';

//* Expo Imports
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
export { ErrorBoundary } from 'expo-router';


//* UI Kitten Imports
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

//* Assets Imports
import { default as theme } from "../assets/theme/custom-theme.json";


//* Third Party Imports
import { AveriaSerifLibre_400Regular, AveriaSerifLibre_700Bold, useFonts } from '@expo-google-fonts/averia-serif-libre';
import 'react-native-reanimated';
import { Inter_400Regular, Inter_700Bold, Inter_400Regular_Italic } from '@expo-google-fonts/inter';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '../assets/_database/initializeDatabase';


export const unstable_settings = { initialRouteName: '(tabs)' };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    AveriaSerifLibre: AveriaSerifLibre_400Regular,
    AveriaSerifLibreBold: AveriaSerifLibre_700Bold,
    Inter: Inter_400Regular,
    InterBold: Inter_700Bold,
    InterItalic: Inter_400Regular_Italic,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <SQLiteProvider databaseName="codexDnd.db" onInit={initializeDatabase}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' ,animation: 'fade_from_bottom', }} />
        <Stack.Screen name="SpellDetails" options={{ presentation: 'card', animation: 'fade_from_bottom', }} />
        <Stack.Screen name="CreateCharacter" options={{ presentation: 'card', animation: 'fade_from_bottom', }} />
        <Stack.Screen name="EditCharacter" options={{ presentation: 'card', animation: 'fade_from_bottom', }} />
        <Stack.Screen name="CharacterDetails" options={{ presentation: 'card', animation: 'fade_from_bottom', }} />
      </Stack>
      </SQLiteProvider>
    </ApplicationProvider>
    
  );
}
