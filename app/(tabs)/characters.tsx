import { StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import React from 'react';

export default function TabTwoScreen() {
  return (
    <Layout style={styles.container}>
      <TitleText type='h2'>Ficha para magias</TitleText>
      <Text>Tela em desenvolvimento...</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'AveriaSerifLibreBold',
  }
});
