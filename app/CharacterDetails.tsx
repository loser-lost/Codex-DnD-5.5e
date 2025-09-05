import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from 'react-native';
import { useCallback, useEffect, useMemo, useState,  } from "react";
import { Layout , Text, DrawerGroup, DrawerItem, Drawer, IndexPath} from "@ui-kitten/components";
import { useTheme } from "@ui-kitten/components/theme";
import { EditIcon,FilterIcon,StarIcon } from "@/utils/useIcons";
import {useCharacterDatabase, CharacterDatabase} from '../assets/_database/useCharacterDatabase'
import {useSpellDatabase, spellDatabase } from '../assets/_database/useSpellDatabase'
import { useCharacterSpellDatabase } from '../assets/_database/useCharacterSpell'
import ShowButtons from "@/components/comp/showFilterBottons";
import { filterSpelsData, toggleItem } from "@/utils/filterFunctionsDb";
import { removerAcentos } from "@/components/comp/utilities";
import { toastMessages } from "@/components/comp/toastMessages"
import SpellTabs from "@/components/comp/spellTabs";
import { CharacterEditModal } from "@/components/comp/CharacterComps/CharacterEditModal";
import { ModalFilter } from "@/components/comp/modalFilterDb";

const CharacterDetails = () => {
    const TM = toastMessages();
    const theme = useTheme();
    const characterDb = useCharacterDatabase();
    const characterSpellDb = useCharacterSpellDatabase();
    const spellDb = useSpellDatabase();

    const {character_id} = useLocalSearchParams();
    const [spels, setSpels] = useState<spellDatabase[]>([]);
    const [spelsKnow, setSpelsKnow] = useState<spellDatabase[]>([]);
    const [character, setCharacter] = useState<CharacterDatabase[]>([]);
    const [visible, setVisible] = React.useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [selectedCircle , setSelectedCircle] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [appliedCircle, setAppliedCircle] = useState<string[]>([]);
    const [appliedClasses, setAppliedClasses] = useState<string[]>([]);


  
    // filter and search function
    const autoFilters = useMemo(() => {
        return Array.from(new Set(character.map(char => char.classe).flat()));
    }, [character]);

    // hooks
    
    useEffect(() => {
        setSelectedClasses(autoFilters);
    }, [autoFilters]);
    
    useEffect(() => {
        if (character_id) {
            characterSearch();
            spellSearch();
        }
    }, [character_id]);

    useEffect(() => {
        if (character_id) {
            spellSearchSpelCharacter(Number(character_id));
        }
    }, [character_id]);

    // functions to fetch data
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
        selectedCircle: appliedCircle,
        selectedClasses: appliedClasses,
    }), [appliedCircle, appliedClasses]);;

    const applyFilters = () => {
        setAppliedCircle(selectedCircle);
        setAppliedClasses(selectedClasses);
        setShowFilter(false); // fecha modal
    }
    ;  
    const [searchQuery, setSearchQuery] = useState('');
    const filteredSpells  = useMemo(() => {
            const searchFiltered = searchQuery
            ? spels.filter(item => 
                removerAcentos(item.name).toLowerCase().includes(removerAcentos(searchQuery).toLowerCase())
                )
            : spels;

        const hasFilters  = Object.values(filters).some(arr => arr.length > 0);
        return hasFilters ? filterSpelsData(searchFiltered, filters) : searchFiltered;
    }, [spels, filters, searchQuery]);
    
    // functions to fetch data
    async function characterSearch(){
        try {
            const response = await characterDb.seachById(character_id as string);
            setCharacter(response);
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
        }
    }

    async function spellSearch(){
        try {
            const response = await spellDb.read();
            setSpels(response);
        } catch (error) {
            console.error('Erro ao buscar magias:', error);
        }
    }

    async function spellSearchSpelCharacter(id: number){
        try {
            const response = await characterSpellDb.searchSpellsByCharacterid(id);
            setSpelsKnow(response);
        } catch (error) {
            console.error('Erro ao buscar magias do personagem:', error);
        }    
    }

    // render item for SectionList
    const knowSpell = useCallback(async (id: number) => {
        const char_id = Number(character_id);
        try{
            const exists = await characterSpellDb.checkIfExists(char_id, id);
            if (exists) {
                TM.knowedSpell();
                return;
            }
            const response = await characterSpellDb.createSC({character_id: Number(char_id), spell_id: id});
            if (response && response.insertedRowId) {
                const addedSpell = spels.find(s => s.id === id);
            if (addedSpell) {
                setSpelsKnow(prev => [...prev, addedSpell]);
                TM.showSucessSpell();
            }
            }
        } catch (error) {
            TM.showFailSpell();
            console.error('Erro ao adicionar a magia ao personagem:', error);
        }
    }, [character_id, spels, spelsKnow]);

    async function removeSpell(id:number) {
        try {
            await characterSpellDb.remove(id)
            TM.removeSpSucess();
            setSpelsKnow(prev => prev.filter(s => s.id !== id));                        
        } catch (error) {
            console.error('Erro ao deletar magia:', error);  
            TM.removeSpFail();         
        }
    }

    async function updateCharacter(updated: CharacterDatabase) {
    try {
        await characterDb.update(updated);
        characterSearch(); // recarrega
        TM.EditCharacterSucess();
        setVisible(false);
    } catch (error) {
        console.error("Erro ao editar personagem:", error);
        TM.EditCharacterFail();
    }
    }
    
    // function to remove items from selected filters
    const removeItem = useCallback(<T,>(
        itemToRemove: T,
        setState: React.Dispatch<React.SetStateAction<T[]>>
    ) => {
        setState(prevItems => prevItems.filter(item => item !== itemToRemove));
    }, []);
    const handleRemoveClass = useCallback((className: string) => {
        removeItem(className, setSelectedClasses);
    }, [removeItem]); 

    const handleRemoveCircle = useCallback((circleName: string) => {
        removeItem(circleName, setSelectedCircle);
    }, [removeItem]); 

    const currentCharacter = useMemo(() => {
        return character.length > 0 ? character[0] : null;
    }, [character]);

    const TopListFilters = ()=>{
        return(
            <Layout style={styles.header}>
                <Layout style={styles.heade1}>
                    <ShowButtons
                        selectedClasses={appliedClasses}
                        selectedCircle={appliedCircle}
                        onRemoveClass={handleRemoveClass}
                        onRemoveCircle={handleRemoveCircle}
                    />
                </Layout>
                <Layout style={styles.heade2}>
                    <FilterIcon filterIcon={handleOpenModalFilter} />
                </Layout>

            </Layout>
        )
    }

    const OpenEditCharacter = ()=>{
        setVisible(true);
    }
    
    return (
        <Layout style={[styles.container, { backgroundColor: theme['background-basic-color-1'] }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <Layout style={styles.headerIcons}>
                <StarIcon />
            </Layout> 
            <Layout style={styles.header}>
                <Layout style={styles.heade1}>
                    {currentCharacter ? (
                            <Layout key={currentCharacter.id} style={{ marginBottom: 16 }}>
                                <Text category="h5">{currentCharacter.name}</Text>
                            </Layout>
                    ) : (
                        <Text category="s1">Nenhum personagem encontrado.</Text>
                    )}
                </Layout>
                <Layout style={styles.heade2}>
                    <EditIcon editIcon={OpenEditCharacter} />
                </Layout>
            </Layout>

            <Layout>
                <TopListFilters />
            </Layout>

            <SpellTabs
                spels={filteredSpells}
                spelsKnow={spelsKnow}
                addSpell={knowSpell}
                removeSpell={removeSpell}
            />
            <CharacterEditModal
                visible={visible}
                onClose={() => setVisible(false)}
                character={currentCharacter}
                onSave={updateCharacter}
                onBackDrop={()=> setVisible(false)}
            />
           <ModalFilter 
                showFilter={showFilter} 
                onBackDrop={()=> setShowFilter(false)} 
                selectedCircle={selectedCircle} 
                selectedClasses={selectedClasses} 
                toggleCircle={toggleCircle} 
                toggleClass={toggleClass} 
                allFilters={allFilters} 
                clearFilters={clearFilters}
                AppliFilter={applyFilters}
            />   
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
        justifyContent: 'center'  
    },
    heade1: {
        marginLeft:5
    },
    heade2: {
        marginRight: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});