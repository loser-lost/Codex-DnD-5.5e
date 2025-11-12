import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { Layout, Text, Input } from "@ui-kitten/components"; // Adicionei Input para a busca
import { useTheme } from "@ui-kitten/components/theme";

// Imports locais (mantidos)
import { FilterIcon, StarIcon } from "@/utils/useIcons";
import { useSpellDatabase, spellDatabase } from '../assets/_database/useSpellDatabase';
import { useCharacterSpellDatabase } from '../assets/_database/useCharacterSpell';
import ShowButtons from "@/components/comp/showFilterBottons";
import { filterSpelsData, toggleItem } from "@/utils/filterFunctionsDb";
import { removerAcentos } from "@/components/comp/utilities";
import { toastMessages } from "@/components/comp/toastMessages";
import SpellTabs from "@/components/comp/spellTabs";
import { ModalFilter } from "@/components/comp/modalFilterDb";

const CharacterDetails = () => {
    const TM = toastMessages();
    const theme = useTheme();
    const characterSpellDb = useCharacterSpellDatabase();
    const spellDb = useSpellDatabase();

    const { idChar, nameChar, classChar } = useLocalSearchParams();
    
    // Normalização segura do ID
    const characterId = useMemo(() => Number(idChar), [idChar]);

    // Correção de nomeclatura: spells e knownSpells
    const [spells, setSpells] = useState<spellDatabase[]>([]);
    const [knownSpells, setKnownSpells] = useState<spellDatabase[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Estados de filtro
    const [selectedCircle, setSelectedCircle] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [appliedCircle, setAppliedCircle] = useState<string[]>([]);
    const [appliedClasses, setAppliedClasses] = useState<string[]>([]);

    // Carregamento inicial de dados
    useEffect(() => {
        if (characterId) {
            loadSpells();
            loadCharacterSpells(characterId);
        }
    }, [characterId]);

    // Auto-filtro baseado na classe que vem da navegação
    useEffect(() => {
        let initialClassFilter: string[] = [];
        if (Array.isArray(classChar)) {
            initialClassFilter = classChar.map(String); // Garante string
        } else if (typeof classChar === 'string') {
            initialClassFilter = [classChar];
        }

        // Atualiza tanto a seleção visual quanto o filtro aplicado
        if (initialClassFilter.length > 0) {
            setSelectedClasses(initialClassFilter);
            setAppliedClasses(initialClassFilter);
        }
    }, [classChar]);

    // Funções de Busca no Banco
    async function loadSpells() {
        try {
            const response = await spellDb.read();
            setSpells(response);
        } catch (error) {
            console.error('Erro ao buscar magias:', error);
        }
    }

    async function loadCharacterSpells(id: number) {
        try {
            const response = await characterSpellDb.searchSpellsByCharacterid(id);
            setKnownSpells(response);
        } catch (error) {
            console.error('Erro ao buscar magias do personagem:', error);
        }
    }

    // Lógica de Filtro Computada
    const filters = useMemo(() => ({
        selectedCircle: appliedCircle,
        selectedClasses: appliedClasses,
    }), [appliedCircle, appliedClasses]);

    const filteredSpells = useMemo(() => {
        let result = spells;

        // 1. Filtro de Texto
        if (searchQuery) {
            const normalizedQuery = removerAcentos(searchQuery).toLowerCase();
            result = result.filter(item => 
                removerAcentos(item.name).toLowerCase().includes(normalizedQuery)
            );
        }

        // 2. Filtros de Categoria (Classe/Circulo)
        const hasFilters = Object.values(filters).some(arr => arr.length > 0);
        if (hasFilters) {
            result = filterSpelsData(result, filters);
        }

        return result;
    }, [spells, filters, searchQuery]);

    // Handlers de Ação
    const handleOpenModalFilter = useCallback(() => setShowFilter(true), []);
    
    const toggleCircle = useCallback((item: string) => toggleItem(item, setSelectedCircle), []);
    const toggleClass = useCallback((item: string) => toggleItem(item, setSelectedClasses), []);

    const handleApplyFilters = () => {
        setAppliedCircle(selectedCircle);
        setAppliedClasses(selectedClasses);
        setShowFilter(false);
    };

    const handleClearFilters = () => {
        setSelectedCircle([]);
        setSelectedClasses([]);
        // Opcional: se quiser limpar e aplicar imediatamente, descomente abaixo:
        // setAppliedCircle([]);
        // setAppliedClasses([]);
    };

    const handleRemoveClass = useCallback((className: string) => {
        setSelectedClasses(prev => {
             const newState = prev.filter(item => item !== className);
             setAppliedClasses(newState); // Atualiza o aplicado imediatamente ao remover pela tag
             return newState;
        });
    }, []);

    const handleRemoveCircle = useCallback((circleName: string) => {
        setSelectedCircle(prev => {
            const newState = prev.filter(item => item !== circleName);
            setAppliedCircle(newState);
            return newState;
        });
    }, []);

    // Adicionar Magia
    const handleLearnSpell = useCallback(async (spellId: number) => {
        if (!characterId) return;
        
        try {
            const exists = await characterSpellDb.checkIfExists(characterId, spellId);
            if (exists) {
                TM.knowedSpell();
                return;
            }
            
            const response = await characterSpellDb.createSC({
                character_id: characterId, 
                spell_id: spellId
            });

            if (response && response.insertedRowId) {
                const addedSpell = spells.find(s => s.id === spellId);
                if (addedSpell) {
                    setKnownSpells(prev => [...prev, addedSpell]);
                    TM.showSucessSpell();
                }
            }
        } catch (error) {
            TM.showFailSpell();
            console.error('Erro ao adicionar magia:', error);
        }
    }, [characterId, spells, characterSpellDb, TM]);

    // Remover Magia
    const handleForgetSpell = async (id: number) => {
        try {
            await characterSpellDb.remove(id);
            TM.removeSpSucess();
            setKnownSpells(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error('Erro ao deletar magia:', error);
            TM.removeSpFail();
        }
    };

    const activeFilterCount = selectedCircle.length + selectedClasses.length;

    return (
        <Layout style={[styles.container, { backgroundColor: theme['background-basic-color-1'] }]}>
            
            {/* Header com Ícone Central */}
            <Layout style={styles.headerIcons}>
                <StarIcon />
            </Layout> 

            {/* Header Principal: Nome e Filtros */}
            <Layout style={styles.headerRow}>
                <Layout style={styles.headerLeft}>
                    <Text category="h6">{nameChar}</Text>
                </Layout>
                
                <Layout style={styles.headerRight}>
                   {/* Removido componente aninhado TopListFilters */}
                   <Layout style={styles.filterControls}>
                        <ShowButtons
                            selectedClasses={selectedClasses} // Usar appliedClasses se quiser mostrar apenas o que está ativo na lista
                            selectedCircle={selectedCircle}
                            onRemoveClass={handleRemoveClass}
                            onRemoveCircle={handleRemoveCircle}
                        />
                        <FilterIcon filterIcon={handleOpenModalFilter} />
                   </Layout>
                </Layout>
            </Layout>

            {/* IMPORTANTE: Campo de Busca Adicionado */}

            <SpellTabs
                spels={filteredSpells}
                spelsKnow={knownSpells}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                addSpell={handleLearnSpell}
                removeSpell={handleForgetSpell}
            />

            <ModalFilter 
                showFilter={showFilter} 
                onBackDrop={() => setShowFilter(false)} 
                selectedCircle={selectedCircle} 
                selectedClasses={selectedClasses} 
                toggleCircle={toggleCircle} 
                toggleClass={toggleClass} 
                allFilters={activeFilterCount} 
                clearFilters={handleClearFilters}
                AppliFilter={handleApplyFilters}
            />   
        </Layout>
    );
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
        marginBottom: 10
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flexShrink: 1,
    },
    filterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
    
});