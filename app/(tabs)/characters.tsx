import { StyleSheet } from 'react-native';


import { Button, Card, Input, Layout, Modal } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import React, { useState, useCallback } from 'react';
import { PlusIcon } from '../../utils/useIcons';

import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const router = useRouter();

  const newCharacter = () => {
    router.push('/CreateCharacter')
  }

  return (
    <Layout style={styles.container}>
      <TitleText type='h2'>Ficha para magias</TitleText>
      <Text>Tela em desenvolvimento...</Text>
      
    <Layout style={styles.nivelBar}>
      <PlusIcon plusIcon={newCharacter} style={styles.title} />
    </Layout>
    

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
  },
  nivelBar: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingVertical: 10,
    width: '90%', 
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  buttons: {
    paddingVertical: 8,
    flexDirection: 'row', 
    justifyContent: 'space-between'}
});
