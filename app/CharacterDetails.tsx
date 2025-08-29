import React, { use } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import {  Alert, SectionList, StyleSheet } from 'react-native';
import { useCallback, useEffect, useMemo, useState,  } from "react";
import { Layout , Text, Modal, Card, Input, Select, Button, SelectItem, IndexPath, TabView, Tab} from "@ui-kitten/components";
import { useTheme } from "@ui-kitten/components/theme";
import { CirculoIcon, ClassIcon, EditIcon, RangeIcon, SchoolIcon, StarIcon, TempoIcon } from "@/utils/useIcons";
import { groupSortSpells } from '../utils/groupMagicDb'
import {useCharacterDatabase, CharacterDatabase} from '../assets/_database/useCharacterDatabase'
import {useSpellDatabase, spellDatabase } from '../assets/_database/useSpellDatabase'
import { RenderSectionHeaderDb} from "../components/comp/sectionComponents";
import { races, classees, levels } from "../components/comp/arrays";
import {RenderSpell} from "../components/comp/sectionComponents";
import SeachBar from "@/components/comp/SeachBar";

import DrawerFilter from "@/components/comp/drawerFilterDb";
import { AppliFilterButton, ClearFiltersButton } from "@/components/comp/buttons";
import { filterSpelsData, toggleItem } from "@/utils/filterFunctionsDb";

const CharacterDetails = () => {
    const teme = useTheme();
    const characterDb = useCharacterDatabase();
    const spellDb = useSpellDatabase(); //useSpellDatabase();
    const {character_id} = useLocalSearchParams();
    const [spels, setSpels] = useState<spellDatabase[]>([]);
    const [character, setCharacter] = useState<CharacterDatabase[]>([]);
    const [id, setId] = React.useState('');
    const [name, setname] = React.useState('');
    const [playerName, setPlayer] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCircle , setSelectedCircle] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedRaceIndex, setSelectedRaceIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedClassIndex, setSelectedClassIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedLevelIndex, setSelectedLevelIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedIndexTab, setSelectedIndexTab] = React.useState(0);

    // filter and search function
    
    const autoFilters = useMemo(() => {
        return Array.from(new Set(character.map(character => character.classe).flat()));
    }, [spels]);

    useEffect(() => {
        setSelectedClasses(autoFilters);
    }, [autoFilters]);

     const handleSearch = (query: string) => {
          setSearchQuery(query);
    };

    const handleOpenModalFilter = useCallback(() => setShowFilter(true), []);
    const toggleCircle = useCallback((item: string) => toggleItem(item, setSelectedCircle), [setSelectedCircle ]);
    const toggleClass = useCallback((item: string) => toggleItem(item, setSelectedClasses), [setSelectedClasses]);
 
    const allFilters = [
      selectedCircle, 
      selectedClasses
    ].reduce((total, arr) => total + arr.length, 0);

    const clearFilters = ()=>{
        [setSelectedCircle,
        setSelectedClasses
        ].forEach(fn => fn([]));
    };

    const filters = useMemo(() => ({
        selectedCircle,
        selectedClasses,
    }), [selectedCircle , selectedClasses]);

    function removerAcentos(texto: String) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const filteredSpells  = useMemo(() => {
            const searchFiltered = searchQuery
            ? spels.filter(item => 
                removerAcentos(item.name).toLowerCase().includes(removerAcentos(searchQuery).toLowerCase())
                )
            : spels;

        const hasFilters  = Object.values(filters).some(arr => arr.length > 0);
        return hasFilters ? filterSpelsData(searchFiltered, filters) : searchFiltered;
    }, [spels, filters, searchQuery]);

    // functios to display selected values
    const displayValueRaça = selectedRaceIndex
    ? races[selectedRaceIndex.row]
    : '';
    const displayValueClasse = selectedClassIndex
    ? classees[selectedClassIndex.row]
    : '';
    const displayValueLevel = selectedLevelIndex
    ? levels[selectedLevelIndex.row] 
    : 0; 

    // hooks
    useEffect(() => {
        characterSearch();    
    }, [ character_id ]);

    useEffect(() => {
        spellSearch();
    }, [ character_id ]);

    // group spells by level
    const grupedSpells = useMemo(() =>{
        return groupSortSpells(filteredSpells);
    }, [filteredSpells]);

    const spellInSections = useMemo(()=>{
          return Object.entries(grupedSpells).map(([circulo, data]) => ({
              title: circulo,
              data,
          }));
    }, [grupedSpells]);

    // functions to fetch data
    async function characterSearch(){
        try {
            const response = await characterDb.seachById(character_id as string);
            setCharacter(response);
    
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
            throw error; 
        }
    }

    async function spellSearch(){
        try {
            const response = await spellDb.read();
            setSpels(response);
        } catch (error) {
            console.error('Erro ao buscar magias:', error);
            throw error;
        }
    }

    // render item for SectionList
    const renderItemSpels = useCallback(({ item }: { item: spellDatabase }) => (
      <RenderSpell item={item} />
    ), []);
    // key extractor for SectionList
    const keyExtractor = useCallback((item: spellDatabase, index: number) => String(item.id) + index, [])

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
                <Layout style={styles.heade1}>
                    {character.length > 0 ? (
                        character.map((Char) => (
                            <Layout key={Char.id} style={{ marginBottom: 16 }}>
                                <Text category="h5">{Char.name}</Text>
                            </Layout>
                        ))
                    ) : (
                        <Text category="s1">Nenhum personagem encontrado.</Text>
                    )}
                </Layout>
                <Layout style={styles.heade2}>
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
                        <SeachBar 
                            value={searchQuery}
                            onChangeText={handleSearch}
                            handleOpenFilter={handleOpenModalFilter}
                            allFilters={allFilters}
                           />
                        <SectionList
                            style={styles.list}
                            sections={spellInSections}
                            keyExtractor={keyExtractor}
                            renderSectionHeader={({ section }) => (<RenderSectionHeaderDb title={section.title} data={section.data} />)}
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
                    <Modal
                    visible={showFilter }
                    backdropStyle={styles.backdrop}
                    style={styles.filterModal}
                    onBackdropPress={() => setShowFilter(false)}
                    >
                    <Card disabled={true} style={styles.filterList}>
                     <Text style={styles.Text}>Selecione os filtros:</Text>
                        <DrawerFilter
                            selectCircle={selectedCircle}
                            selectedClasses={selectedClasses}
                            toggleCircle={toggleCircle}
                            toggleClass={toggleClass}
                            CirculoIcon={CirculoIcon}
                            ClassIcon={ClassIcon}                   
                        />
                        <Layout style={styles.buttons}>
                          <AppliFilterButton applyFilter={() => setShowFilter(false)} allFilters={allFilters} />
                          <ClearFiltersButton clearFilters={clearFilters} />
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
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
       
    },
    heade1: {
        marginLeft:5
    },
    heade2: {
        marginRight: 5,
    },
        input: {
        margin: 2,
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
        padding: 5,
    },
    botton:{
        flex: 1,
        margin: 5,
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    list:{
        width: '100%',
        height: '87%',
    },
    filterModal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    filterList: {
        maxHeight: '90%',
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
     Text:{
        paddingTop: 10,
        marginLeft: 15, 
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});