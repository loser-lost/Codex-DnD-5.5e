import React, { useCallback, useEffect, useState } from 'react';

import {  StyleSheet } from 'react-native';
import {  Layout, useTheme } from '@ui-kitten/components';
import { TitleText } from "@/components/StyledText";

import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ClassIcon, SchoolIcon, RangeIcon, TempoIcon, CirculoIcon} from '../utils/useIcons';
import {  AppliFilterButton, ClearFiltersButton} from '../utils/buttons';
import BackButton from '../utils/buttons';
import DrawerFilter from '../utils/drawerFilter'


export default function FilterSpell() {
    const router = useRouter();
    const theme = useTheme();
    const [selectCircle, setSelectCircle] = useState<string[]>([]);
    const [schoolsSelected, setSchoolsSelected] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedRange, setSelectedRange] = useState<string[]>([]);
    const [selectedTempo, setSelectedTempo] = useState<string[]>([]);
    const FILTER_STORAGE_KEY = 'spellFilterSelections';

    
    useEffect(() => {
        loadFiltersFromStorage();
    }, []); 

    const saveFiltersToStorage = useCallback(async () => {
        const data = {
            selectCircle,
            schoolsSelected,
            selectedClasses,
            selectedRange,
            selectedTempo,
        };
        try {
            await AsyncStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar filtros:', error);
        }
    }, [selectCircle, schoolsSelected, selectedClasses, selectedRange, selectedTempo]);

    const loadFiltersFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem(FILTER_STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                setSelectCircle(Array.isArray(parsed.selectCircle) ? parsed.selectCircle : []);
                setSchoolsSelected(Array.isArray(parsed.schoolsSelected) ? parsed.schoolsSelected : []);
                setSelectedClasses(Array.isArray(parsed.selectedClasses) ? parsed.selectedClasses : []);
                setSelectedRange(Array.isArray(parsed.selectedRange) ? parsed.selectedRange : []);
                setSelectedTempo(Array.isArray(parsed.selectedTempo) ? parsed.selectedTempo : []);
            }
        } catch (error) {
            console.error('Erro ao carregar filtros:', error);
        }
    };
    const applyFilter = async () => {
        await saveFiltersToStorage();
        if (
            schoolsSelected.length === 0 &&
            selectedClasses.length === 0 &&
            selectedRange.length === 0 &&
            selectedTempo.length === 0 &&
            selectCircle.length === 0
        ) {
            router.push('/');
        } else {
            router.push({
                pathname: '/',
                params: {
                    escolas: JSON.stringify(schoolsSelected),
                    classes: JSON.stringify(selectedClasses),
                    range: JSON.stringify(selectedRange),
                    tempo: JSON.stringify(selectedTempo),
                    circle: JSON.stringify(selectCircle),
                }
            });
        }
    };

    const totalFiltros = [
        selectCircle.length,
        schoolsSelected.length,
        selectedClasses.length,
        selectedRange.length,
        selectedTempo.length,
    ].reduce((a, b) => a + b, 0);

    const clearFilters = async () => {
        try {
            setSelectCircle([]);
            setSchoolsSelected([]);
            setSelectedClasses([]);
            setSelectedRange([]);
            setSelectedTempo([]);
            await AsyncStorage.removeItem(FILTER_STORAGE_KEY);
            //router.push('/');
        } catch (error) {
            console.error('Erro ao limpar filtros:', error);
        }
    };

    const toggleCircle = useCallback((item: string) => {
        setSelectCircle(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }, []);

    const toggleClass = useCallback((item: string) => {
        setSelectedClasses(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }, []);

    const toggleSchool = useCallback((item: string) => {
        setSchoolsSelected(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }, []);

    const toggleRange = useCallback((item: string) => {
        setSelectedRange(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }, []);

    const toggleTime = useCallback((item: string) => {
        setSelectedTempo(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }, []);

    return (
        <Layout style={{ flex: 1, backgroundColor: theme['color-basic-1000'] }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Layout style={styles.header}>
                <TitleText type='h4' style={styles.Text}>
                    Escolha os filtros:
                </TitleText>
            </Layout>
            <Layout style={styles.container}> 
                <DrawerFilter
                    selectCircle={selectCircle}
                    selectedClasses={selectedClasses}
                    schoolsSelected={schoolsSelected}
                    selectedRange={selectedRange}
                    selectedTempo={selectedTempo}
                    toggleCircle={toggleCircle}
                    toggleClass={toggleClass}
                    toggleSchool={toggleSchool}
                    toggleRange={toggleRange}
                    toggleTime={toggleTime}
                    CirculoIcon={CirculoIcon}
                    ClassIcon={ClassIcon}
                    SchoolIcon={SchoolIcon}
                    RangeIcon={RangeIcon}
                    TempoIcon={TempoIcon}                    
                />
            </Layout>
            <Layout style={styles.buttons}>
                    <AppliFilterButton applyFilter={applyFilter} totalFiltros={totalFiltros} />
                    <ClearFiltersButton clearFilters={clearFilters} />
                    
            </Layout>
        </Layout>
    );
}const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        marginTop: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 5,
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    header: {
        padding: 10,
        display: 'flex',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        flexDirection: 'row', 
    },
    Text:{
        marginLeft: 5
    }
});
