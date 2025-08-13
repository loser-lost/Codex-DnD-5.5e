import { StyleSheet } from 'react-native';


import { Button, Card, Input, Layout, List, ListItem, Modal } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import React, { useState, useCallback, useEffect } from 'react';
import {useCharacterDatabase, CharacterDatabase} from '../../assets/_database/useCharacterDatabase'
import { PlusIcon } from '../../utils/useIcons';
import { useRouter } from 'expo-router';



export default function TabTwoScreen() {

  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState<CharacterDatabase[]>([]);

  const  characterDatabase  = useCharacterDatabase();
  const router = useRouter();
  const newCharacter = () => {router.push('/CreateCharacter')}

    async function seacrchlistCharacters(){
      try {
        const response = await characterDatabase.seachByName(search);
        setCharacters(response);

      } catch (error) {
        console.error('Erro ao listar personagens:', error);
        alert('Erro ao listar personagens. Tente novamente.');
      }
      
    }

    useEffect(() => {
      seacrchlistCharacters();
    }, [search]);

    async function listCharacters() {
      try {
        const response = await characterDatabase.read()
        setCharacters(response);
      } catch (error) {
        console.error('Erro ao listar personagens:', error);
        throw error;
      } 
    }

    useEffect(() => {
      listCharacters();
    }, [listCharacters]);

     const renderItem = ({ item }: { item: CharacterDatabase}): React.ReactElement => (
    <ListItem
      title={`${item.name}`}
      description={`${item.race} - ${item.classe}`}
     // accessoryLeft={renderItemIcon}
     // accessoryRight={renderItemAccessory}
    />
  );

  return (
    <Layout style={styles.container}>
    <Layout >
      <Input
        
        placeholder="Procurar..."  
        value={search}
        onChangeText={setSearch}
      />
    </Layout>
   
      
    <List
      style={{flex: 1, marginTop: 20, width: '90%', height: '80%'}}
      data={characters}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
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
