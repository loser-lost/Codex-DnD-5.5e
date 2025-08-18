import { StyleSheet } from 'react-native';


import {   Layout, List, ListItem } from '@ui-kitten/components';

import React, { useState, useEffect } from 'react';
import {useCharacterDatabase, CharacterDatabase} from '../../assets/_database/useCharacterDatabase'
import { PlusIcon } from '../../utils/useIcons';
import { useRouter } from 'expo-router';



export default function TabTwoScreen() {
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState<CharacterDatabase[]>([]);
  const  characterDatabase  = useCharacterDatabase();
  const router = useRouter();
  const newCharacter = () => {router.push('/CreateCharacter')}

  /*
    async function seacrchlistCharacters(){
      try {
        const response = await characterDatabase.seachByName(search);
        setCharacters(response);
      } catch (error) {
        console.error('Erro ao listar personagens:', error);
        throw error;
      }
      
    }
    useEffect(() => {
      seacrchlistCharacters();
    }, [search]);

    <Input
            style={styles.search}
            placeholder="Procurar..."  
            value={search}
            onChangeText={setSearch}
          />
    */

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

    const roteCharacterDetails = (id: number) => {
      router.push(`/CharacterDetails?character_id=${id}`);
    }

     const renderItem = ({ item }: { item: CharacterDatabase}): React.ReactElement => 
      (
        <ListItem
          onPress={() => roteCharacterDetails(item.id)}
          title={`${item.name}`}
          description={`${item.race} - ${item.classe}`}
        // accessoryLeft={renderItemIcon}
        // accessoryRight={renderItemAccessory}
        />
      );

      
      
  return (
    <Layout style={styles.container}>
      <Layout style={{width: '100%', alignItems: 'center'}}>

        <List
          style={{ marginTop: 20, width: '90%'}}
          data={characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
         
        />
        <Layout style={styles.nivelBar}>
          <PlusIcon plusIcon={newCharacter} />
        </Layout>
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
 
  nivelBar: {
    flexDirection: 'row-reverse',
    
    paddingVertical: 10,
    width: '90%', 
  },
  search: {
    width: '90%',
    marginVertical: 10,
  },
});
