import { Layout , Text, Modal, Card, Input, Select, Button, SelectItem, IndexPath, List, ListItem, TabView, Tab} from "@ui-kitten/components";
import { useTheme } from "@ui-kitten/components/theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {useCharacterDatabase, CharacterDatabase} from '../assets/_database/useCharacterDatabase'
import {useSpellDatabase, spellDatabase } from '../assets/_database/useSpellDatabase'

import {  Alert, SectionList, StyleSheet } from 'react-native';
import { use, useCallback, useEffect, useMemo, useState,  } from "react";
import React from "react";
import { EditIcon, StarIcon } from "@/utils/useIcons";
import { TabViewComponent } from "@/components/comp/tabView";



const CharacterDetails = () => {
    const router = useRouter();
    const teme = useTheme();
    const {character_id} = useLocalSearchParams();
    const characterDb = useCharacterDatabase();
    const spellDb = useSpellDatabase();
    const [character, setCharacter] = useState<CharacterDatabase[]>([]);
    const [id, setId] = React.useState('');
    const [name, setname] = React.useState('');
    const [playerName, setPlayer] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const races = useMemo(() => ['Humano', 'Elfo', 'Anão', 'Orc', 'Assimar', 'Gnomo', 'Halfling', 'Golias', 'Tiferino', 'Draconato'], []);
    const classees = useMemo(() => ['Mago', 'Feiticeiro', 'Clérigo', 'Ladino', 'Guardião', 'Bardo', 'Druida', 'Bruxo','Paladino'], []);
    const levels = useMemo(() => [1, 2, 3, 4 ,5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], []);
    const [spels, setSpels] = useState<spellDatabase[]>([]);
    const [selectedRaceIndex, setSelectedRaceIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedClassIndex, setSelectedClassIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedLevelIndex, setSelectedLevelIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedIndexTab, setSelectedIndexTab] = React.useState(0);
    const keyExtractor = useCallback((item: spellDatabase) => String(item.id), [])
    const displayValueRaça = selectedRaceIndex
    ? races[selectedRaceIndex.row]
    : '';
    const displayValueClasse = selectedClassIndex
    ? classees[selectedClassIndex.row]
    : '';
    const displayValueLevel = selectedLevelIndex
    ? levels[selectedLevelIndex.row] 
    : 0; 

    useEffect(() => {
        characterSearch();
    }, [character_id]);

    async function characterSearch(){
        try {
            const response = await characterDb.seachById(character_id as string);
            //console.log(response);
            setCharacter(response);
    
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
            throw error; 
        }
    }

    useEffect(() => {
        spellSearch();
    }, [ character_id ]);

    async function spellSearch(){
        try {
            const response = await spellDb.read();
            setSpels(response);
            
        } catch (error) {
            console.error('Erro ao buscar magias:', error);
            throw error;
        }
    }
    const renderItemSpels = ({ item }: { item: spellDatabase }): React.ReactElement => (
        <ListItem
          title={`${item.name}`}
          description={`${item.classes} - Círculo: ${item.level}`}
        />
    ); 

    /*
      const renderItem = ({ item }: { item: CharacterDatabase}): React.ReactElement => (
            <ListItem
              onPress={() => roteCharacterDetails(item.id)}
              title={`${item.name}`}
              description={`${item.race} - ${item.classe}`}
            // accessoryLeft={renderItemIcon}
             accessoryRight={ <DeleteIconX deleteIconX={() => deleteCharacter(item.id)} />}
            />
          );
    const openModal = () => {
        if (character.length > 0) {
            const currentChar = character[0];
            setId(currentChar.id.toString()); // Convertendo para string para o estado
            setname(currentChar.name);
            setPlayer(currentChar.playerName);
            setSelectedRaceIndex(new IndexPath(races.indexOf(currentChar.race)));
            setSelectedClassIndex(new IndexPath(classees.indexOf(currentChar.classe)));
            setSelectedLevelIndex(new IndexPath(levels.indexOf(currentChar.level)));
        }
        setVisible(true);
    }*/

    async function updateCharacter(){
        const race = selectedRaceIndex !== undefined ? races[selectedRaceIndex.row] : '';
        const classe = selectedClassIndex !== undefined ? classees[selectedClassIndex.row] : '';
        const level = displayValueLevel;
        try {
            await characterDb.update({
            id: Number(id),
            name,
            race,
            classe,
            level: Number(level),
            playerName
            })
            characterSearch()
            Alert.alert("Personagem editado com sucesso.");
            setVisible(false);
            
        }catch (error) {
          console.error('Erro ao editar personagem:', error);
          alert('Erro ao editar personagem. Tente novamente.');
        }
      }

    return (
        <Layout style={[styles.container, { backgroundColor: teme['background-basic-color-1'] }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <Layout style={styles.headerIcons}>
                <StarIcon />
            </Layout>
            <Layout style={styles.header}>

            {character.length > 0 ? (
                character.map((Char) => (
                    <Layout key={Char.id} style={{ marginBottom: 16 }}>
                        <Text category="h5">{Char.name}</Text>
                        <Text category="s1">{`Raça: ${Char.race}`}</Text>
                        <Text category="s1">{`Classe: ${Char.classe}`}</Text>
                        <Text category="s1">{`Nível: ${Char.level}`}</Text>
                        <Text category="s1">{`Jogador: ${Char.playerName}`}</Text>
                    </Layout>
                ))
            ) : (
                <Text category="s1">Nenhum personagem encontrado.</Text>
            )}
            <EditIcon editIcon={() => {
                if (character.length > 0) {
                    const currentChar = character[0];
                    setId(currentChar.id.toString()); // Convertendo para string para o estado
                    setname(currentChar.name);
                    setPlayer(currentChar.playerName);
                    setSelectedRaceIndex(new IndexPath(races.indexOf(currentChar.race)));
                    setSelectedClassIndex(new IndexPath(classees.indexOf(currentChar.classe)));
                    setSelectedLevelIndex(new IndexPath(levels.indexOf(currentChar.level)));
                }
                setVisible(true);
            }} />
            </Layout>
            
            <TabView
                selectedIndex={selectedIndexTab}
                onSelect={index => setSelectedIndexTab(index)}
            >
                        <Tab title='Magias Conhecidas'>
                            <Layout style={styles.tabContainer}>
                                <Text>Conteúdo de Magias Conhecidas</Text>
                            </Layout>
                        </Tab>
                        <Tab title='Todas as Magias'>
                            <Layout style={styles.tabContainer}>
                                <List
                                    style={styles.list}
                                    data={spels}
                                    keyExtractor={keyExtractor}
                                    renderItem={renderItemSpels}
                                    initialNumToRender={10}
                                    maxToRenderPerBatch={10}
                                    windowSize={5} 
                                />
                            </Layout>
                        </Tab>
                        
                        
            </TabView>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
            >
                    <Card>
                        <Text category="h5">Editar Personagem</Text>
                        <Layout style={styles.container}>
                            <Input
                                style={styles.input}
                                value={name}
                                placeholder="Nome"
                                onChangeText={setname}
                            />
                            <Input
                                style={styles.input}
                                value={playerName}
                                placeholder="Nome do Jogador"
                                onChangeText={setPlayer}
                            />
                            <Select
                                style={styles.input}
                                value={displayValueRaça}
                                selectedIndex={selectedRaceIndex}
                                onSelect={index => setSelectedRaceIndex(index as IndexPath)}
                                placeholder="Raça"
                            >
                                {races.map((r, i) => <SelectItem key={i} title={r} />)}
                            </Select>
                            <Select
                                style={styles.input}
                                value={displayValueClasse}
                                selectedIndex={selectedClassIndex}
                                onSelect={index => setSelectedClassIndex(index as IndexPath)}
                                placeholder="Classe"
                            >
                                {classees.map((r, i) => <SelectItem key={i} title={r} />)}
                            </Select>
                            <Select
                                style={styles.input}
                                value={displayValueLevel.toString()}
                                selectedIndex={selectedLevelIndex}
                                onSelect={index => setSelectedLevelIndex(index as IndexPath)}
                                placeholder="Nível"
                            >
                                {levels.map((r, i) => <SelectItem key={i} title={r.toString()} />)}
                            </Select>
                            <Layout style={styles.containerbottom}>
                                <Button style={styles.botton} onPress={updateCharacter}>Salvar</Button>
                                <Button style={styles.botton} onPress={() => setVisible(false)}>Cancelar</Button>
                            </Layout>
                        </Layout>    
                    </Card>
            </Modal>
        </Layout>
    )
} 
export default CharacterDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerIcons: { 
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15 
    },
        input: {
        margin: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerbottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    botton:{
        flex: 1,
        margin: 5,
    },
    tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list:{
    width: '90%',
  }
});