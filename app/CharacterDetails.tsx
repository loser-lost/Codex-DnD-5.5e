import React from "react";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from 'react-native';
import { useCallback, useEffect, useMemo, useState,  } from "react";
import { Layout , Text} from "@ui-kitten/components";
import { useTheme } from "@ui-kitten/components/theme";
import { FilterIcon,StarIcon } from "@/utils/useIcons";
import {useSpellDatabase, spellDatabase } from '../assets/_database/useSpellDatabase'
import { useCharacterSpellDatabase } from '../assets/_database/useCharacterSpell'
import ShowButtons from "@/components/comp/showFilterBottons";
import { filterSpelsData, toggleItem } from "@/utils/filterFunctionsDb";
import { removerAcentos } from "@/components/comp/utilities";
import { toastMessages } from "@/components/comp/toastMessages"
import SpellTabs from "@/components/comp/spellTabs";
import { ModalFilter } from "@/components/comp/modalFilterDb";

const CharacterDetails = () => {
    const TM = toastMessages();
    const theme = useTheme();

    const characterSpellDb = useCharacterSpellDatabase();
    const spellDb = useSpellDatabase();

    const { idChar, nameChar, classChar } = useLocalSearchParams();
    const character_id = idChar;
   
    const [spels, setSpels] = useState<spellDatabase[]>([]);
    const [spelsKnow, setSpelsKnow] = useState<spellDatabase[]>([]);
    const [showFilter, setShowFilter] = useState(false);

    const [selectedCircle , setSelectedCircle] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [appliedCircle, setAppliedCircle] = useState<string[]>([]);
    const [appliedClasses, setAppliedClasses] = useState<string[]>([]);

    useEffect(() => {
        if (character_id) {
            spellSearch();
            spellSearchSpelCharacter(Number(character_id));
        }
    }, [character_id]);

    // filter and search function
    const autoFilters = useMemo(() => {
        
        if (Array.isArray(classChar)) {
            return classChar;
        }
        if (typeof classChar === 'string') {
            return [classChar];
        }
        return []; // Retorna um array vazio como padrão seguro
    }, [classChar]);
    
    // hooks
    useEffect(() => {
        setSelectedClasses(autoFilters);
    }, [autoFilters]);

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

    const TopListFilters = ()=>{
        return(
            <Layout style={styles.header}>
                <Layout style={styles.heade1}>
                    <ShowButtons
                        selectedClasses={selectedClasses}
                        selectedCircle={selectedCircle}
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

    return (
        <Layout style={[styles.container, { backgroundColor: theme['background-basic-color-1'] }]}>
            
            <Layout style={styles.headerIcons}>
                <StarIcon />
            </Layout> 
            <Layout style={styles.header}>
                <Layout style={styles.heade1}>
                    <Text>{nameChar}</Text>
                </Layout>
                <Layout style={styles.heade2}>
                    <TopListFilters />
                </Layout>
            </Layout>
{/*editCharacter OpenEditCharacter*/}

            <SpellTabs
                spels={filteredSpells}
                spelsKnow={spelsKnow}
                addSpell={knowSpell}
                removeSpell={removeSpell}
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