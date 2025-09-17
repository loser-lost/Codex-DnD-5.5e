import {  StyleSheet } from 'react-native';
import {   Button, Layout, List, ListItem, useTheme} from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import {useCharacterDatabase, CharacterDatabase} from '../../assets/_database/useCharacterDatabase'
import { DeleteIconX, EditIcon, PlusIcon, StarIcon } from '../../utils/useIcons';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const [characters, setCharacters] = useState<CharacterDatabase[]>([]);
  const  characterDatabase  = useCharacterDatabase();
  const router = useRouter();

  const newCharacter = () => {
    router.push('/CreateCharacter')
  }

  async function listCharacters() {
    try {
      const response = await characterDatabase.read()
      setCharacters(response ?? []);
    } catch (error) {
      console.error('Erro ao listar personagens:', error);
      setCharacters([]);
    } 
  }

  useEffect(() => {
    listCharacters();
  }, []);

  const roteCharacterDetails = (id: number) => {
    router.push(`/CharacterDetails?character_id=${id}`);
  }
  const roteCharacterDetailsTeste = ({ item }: { item: CharacterDatabase}) => {
    router.push(`/CharacterDetails?character_id=${item.id}Character_name=${item.name}Character_class=${item.classe}`);
  }
  const roteCharDetails =({ item }: { item: CharacterDatabase }) =>{
    router.push({
      pathname: '/CharacterDetails',
      params:{
        idChar: item.id,
        nameChar: item.name,
        classChar: item.classe,
        //raceChar: item.race
      }
    })
  }

    const editCharacter = ({ item }: { item: CharacterDatabase}) => {
          router.push(`/EditCharacter?character_id=${item.id}`);    
    }

  async function deleteCharacter(id: number) {
    try {
      await characterDatabase.remove(id)
      listCharacters();
    } catch (error) {
      console.error('Erro ao deletar personagem:', error);
    }
  }

  const renderItem = ({ item }: { item: CharacterDatabase}): React.ReactElement => {
    //console.log('Renderizando item:', item);
    
    return (
      <ListItem
        onPress={() => roteCharDetails({item})}
        title={`${item.name}`} // O problema provavelmente está no valor aqui
        description={`${item.race} - ${item.classe}`}
        accessoryLeft={<EditIcon editIcon={() => editCharacter({item})} />}
        accessoryRight={<DeleteIconX deleteIconX={() => deleteCharacter(item.id)} />}
      />
    );
  };

  return (
  <Layout style={styles.container}>

    <Layout style={styles.headerIcons}>
      <StarIcon />
    </Layout>

    <Layout style={{width: '100%', alignItems: 'center'}}>
      <List
        style={{ marginTop: 20, width: '90%'}}
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()
        }
      />
    </Layout>

    <Button
    style={styles.fabButton}
    accessoryLeft={PlusIcon}
    onPress={newCharacter}
    />

  </Layout>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerIcons: { 
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fabButton: {
    position: 'absolute',
    right: 20, 
    bottom: 20, 
    width: 56,
    height: 56,
    borderRadius: 28,
  }
});
