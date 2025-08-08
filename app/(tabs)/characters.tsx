import { StyleSheet } from 'react-native';


import { Button, Card, Input, Layout, Modal } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import React, { useState, useCallback } from 'react';
import { PlusIcon } from '../../utils/useIcons';

import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function TabTwoScreen() {
  const [showCaracter, setShowCaracter] = useState(false);



  const openCreateCharacter = useCallback(() => setShowCaracter(true), []);

  const createCaracter = useCallback(() => {setShowCaracter(false);}, []);



  return (
    <Layout style={styles.container}>
      <TitleText type='h2'>Ficha para magias</TitleText>
      <Text>Tela em desenvolvimento...</Text>
      
    <Layout style={styles.nivelBar}>
      <PlusIcon plusIcon={openCreateCharacter} style={styles.title} />
    </Layout>
    
    <Modal visible={showCaracter}>
        <Card disabled={true}>
          <Text>
            Criar Personagem
          </Text>
           <Input
                style={styles.input}
                placeholder='Name'
                onSubmitEditing={(e) => {}}
            />

          <Button>
            Ler Valor
          </Button>
          <Button>
            remover Valor
          </Button>
      
          <Layout style={styles.buttons}>
          <Button onPress={() => setShowCaracter(false)}>
            Cancelar
          </Button>
           <Button onPress={createCaracter}>
            Salvar
          </Button>
          </Layout>
          
        </Card>
    </Modal>
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
