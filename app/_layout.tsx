//* React Imports
import { useEffect } from 'react';
import React from 'react';

//* Expo Imports
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
export { ErrorBoundary } from 'expo-router';

//* UI Kitten Imports
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

//* Assets Imports
import { default as theme } from "../assets/theme/custom-theme.json";

//* Third Party Imports
import { AveriaSerifLibre_700Bold } from '@expo-google-fonts/averia-serif-libre/700Bold';
import { AveriaSerifLibre_400Regular } from '@expo-google-fonts/averia-serif-libre/400Regular';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_400Regular_Italic } from '@expo-google-fonts/inter/400Regular_Italic';
import 'react-native-reanimated';


export const unstable_settings = { initialRouteName: '(tabs)' };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ApplicationProvider>
  );
}
