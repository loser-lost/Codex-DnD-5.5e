import React, {  useCallback, useEffect, useMemo, useState } from 'react';

import { SectionList, StyleSheet } from 'react-native';

import {  Divider, Layout,  Text, Modal, Card } from '@ui-kitten/components';

import SeachBar from '../../components/comp/SeachBar';
import RenderSpell from '../../components/comp/renderSpell';
import {RenderSectionHeader} from '../../components/comp/renderSpell';
import DrawerFilter from '../../components/comp/drawerFilter';
import { AppliFilterButton, ClearFiltersButton } from '@/components/comp/buttons';

import { magias } from '@/assets/json/magias.json';

import { groupSortSpells } from '../../utils/groupMagic';
import { Spell } from '../../utils/groupMagic';
import { debounce } from '@/utils/debounce';
import {ClassIcon, SchoolIcon, RangeIcon, TempoIcon, CirculoIcon } from '../../utils/useIcons';
import { filterSpels, toggleItem } from '../../utils/filterFunctions';

export default function SpellsScreen() {
    // State variables
    const [filteredData, setFilteredData] = useState<Spell[]>([]);
    const [selectedCircle , setSelectedCircle] = useState<string[]>([]);
    const [schoolsSelected, setSchoolsSelected] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedRange, setSelectedRange] = useState<string[]>([]);
    const [selectedTempo, setSelectedTempo] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [spells, setSpells] = useState<Spell[]>(magias);
    const [showFilter, setShowFilter] = useState(false);
    const keyExtractor = useCallback((item: Spell) => String(item.magia_id), [])

    //Search Functions 
     const handleSearch = (query: string) => {
      setSearchQuery(query);
    };

    useEffect(() => {
      if (searchQuery.length > 0) {
        handleSearchDebounced(searchQuery);
      }
    }, [searchQuery]);

    const handleSearchDebounced = useMemo(() => debounce((query: string) => {
      const filtered = spells.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(filtered);
    }, 500), [spells]);
    //End search Functions

    // start filters functions  
    const toggleCircle = useCallback((item: string) => toggleItem(item, setSelectedCircle), [setSelectedCircle ]);
    const toggleClass = useCallback((item: string) => toggleItem(item, setSelectedClasses), [setSelectedClasses]);
    const toggleSchool = useCallback((item: string) => toggleItem(item, setSchoolsSelected), [setSchoolsSelected]);
    const toggleRange = useCallback((item: string) => toggleItem(item, setSelectedRange), [setSelectedRange]);
    const toggleTime = useCallback((item: string) => toggleItem(item, setSelectedTempo), [setSelectedTempo]);

    const allFilters = [
      selectedCircle, 
      schoolsSelected, 
      selectedClasses, 
      selectedRange, 
      selectedTempo
    ].reduce((total, arr) => total + arr.length, 0);
    
    const clearFilters = ()=>{
       [setSelectedCircle, 
        setSchoolsSelected, 
        setSelectedClasses, 
        setSelectedRange, 
        setSelectedTempo
      ].forEach(fn => fn([]));
    };

    const filters = useMemo(() => ({
      selectedCircle,
      schoolsSelected,
      selectedClasses,
      selectedRange,
      selectedTempo
    }), [selectedCircle , schoolsSelected, selectedClasses, selectedRange, selectedTempo]);

    const filter = useMemo(() => {
      const shouldFilter = Object.values(filters).some(arr => arr.length > 0);
      return shouldFilter ? filterSpels(magias, filters) : magias;
    }, [filters]);

      const applyFilter = () => {
        setSpells(filter);
        setShowFilter(false);
      }
    // End filters functions

    // Start groups functions
    const groupedSpells = useMemo(() => {
      const base = searchQuery ? filteredData : spells;
      return groupSortSpells(base);
    }, [searchQuery, filteredData, spells]);

    const spellInSections = useMemo(()=>{
      return Object.entries(groupedSpells).map(([circulo, data]) => ({
          title: circulo,
          data,
      }));
    }, [groupedSpells]);
    // End groups functions 

    // Start render functions
    const renderItem = useCallback(({ item }: { item: Spell }) => (
      <RenderSpell item={item} />
    ), []);
    
    const handleOpenModalFilter = useCallback(() => setShowFilter(true), []);
    // End render functions

    return (
      <Layout style={styles.container}>
        <SeachBar value={searchQuery} onChangeText={handleSearch} handleOpenFilter={handleOpenModalFilter} allFilters={allFilters}  />

        <SectionList
          sections={spellInSections}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={({ section }) => (<RenderSectionHeader title={section.title} data={section.data} />)}
          ItemSeparatorComponent={Divider}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
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
            <Layout style={styles.buttons}>
              <AppliFilterButton applyFilter={applyFilter} allFilters={allFilters} />
              <ClearFiltersButton clearFilters={clearFilters} />
            </Layout>
        </Card>
      </Modal>
    
    </Layout>
  )}
  const styles = StyleSheet.create({
    container: {
      
      flex: 1,
    },
    header: {
      
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 8,
      display: 'flex',
    },
    input: {
      flex: 1,
      marginHorizontal: 4
    },
    nivelBar: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 40,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: "black"
    },
    listSpells: {
      flex: 1,
      width: '100%'
    },
    title: {
      fontSize: 32, //DB7610
      fontFamily: 'AveriaSerifLibreBold',
    },
     backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
     Text:{
        paddingTop: 10,
        marginLeft: 15, 
    },
    filterList: {
      maxHeight: '90%',
      width: '100%',
      borderRadius: 8,
      overflow: 'hidden',
    },
     buttons:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    filterModal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
   
    }
  });