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
import {ClassIcon, SchoolIcon, RangeIcon, TempoIcon, CirculoIcon } from '../../utils/useIcons';


export default function SpellsScreen() {
    // State variables
    const [filteredData, setFilteredData] = useState<Spell[]>([]);
    const [selectCircle, setSelectCircle] = useState<string[]>([]);
    const [schoolsSelected, setSchoolsSelected] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedRange, setSelectedRange] = useState<string[]>([]);
    const [selectedTempo, setSelectedTempo] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [spells, setSpells] = useState<Spell[]>(magias);
    const [showFilter, setShowFilter] = useState(false);
    const keyExtractor = useCallback((item: Spell) => String(item.magia_id), [])

    //Search Functions 
    useEffect(() => {
      if (searchQuery.length > 0) {
        handleSearchDebounced(searchQuery);
      }
    }, [searchQuery]);

    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
    
    const debounce = (func: (...args: string[]) => void, wait: number) => {
      let timeout: number;
      return (...args: string[]) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
      };
    };

    const handleSearchDebounced = useMemo(() => debounce((query: string) => {
      const filtered = spells.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(filtered);
    }, 500), [spells]);
    //End search Functions

    // start filters functions
    const allFilters = [ selectCircle.length, schoolsSelected.length, selectedClasses.length, selectedRange.length, selectedTempo.length,].reduce((a, b) => a + b, 0);
    const hasSchools = schoolsSelected.length > 0;
    const hasClass = selectedClasses.length > 0;
    const hasRange = selectedRange.length > 0;
    const hasTime = selectedTempo.length > 0;
    const hasCircle = selectCircle.length > 0;
    
    const toggleCircle = useCallback((item: string) => toggleItem(item, setSelectCircle), []);
    const toggleClass = useCallback((item: string) => toggleItem(item, setSelectedClasses), []);
    const toggleSchool = useCallback((item: string) => toggleItem(item, setSchoolsSelected), []);
    const toggleRange = useCallback((item: string) => toggleItem(item, setSelectedRange), []);
    const toggleTime = useCallback((item: string) => toggleItem(item, setSelectedTempo), []);

    const filterBySchool = (item: Spell) => !hasSchools || schoolsSelected.includes(item.escola);
    const filterByClass = (item: Spell) => !hasClass || item.classes.some(classe =>  selectedClasses.includes(classe));
    const filterByRange = (item: Spell) => !hasRange || selectedRange.includes(item.alcance);
    const filterByTime = (item: Spell) => !hasTime || selectedTempo.includes(item.tempo_de_conjuracao);
    const filterByCircle = (item: Spell) => !hasCircle || selectCircle.includes(item.circulo);

    const toggleItem = (
        item: string,
        setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const clearFilters = ()=>{
      setSelectCircle([]);
      setSchoolsSelected([]);
      setSelectedClasses([]);
      setSelectedRange([]);
      setSelectedTempo([]);
    };

    const filterTest = useMemo(() => {
      if(!(hasSchools || hasClass || hasRange || hasTime || hasCircle)){
        return magias;
      }
      return magias.filter(magia => filterBySchool(magia) &&
      filterByClass(magia) &&
      filterByRange(magia) &&
      filterByTime(magia) &&
      filterByCircle(magia)
      );

    },[selectCircle, schoolsSelected, selectedClasses, selectedRange, selectedTempo])

    const applyFilter = () => {
      setSpells(filterTest);
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
    
    /*
    const handleOpenModalFilter = useCallback(() => setShowFilter(true), []);
    */
     
    const handleOpenModalFilter = useCallback(
      debounce(() =>{
        setShowFilter(true)
      }, 300),[]
    );
    // End render functions

    return (
      <Layout style={styles.container}>
        <SeachBar value={searchQuery} onChangeText={handleSearch} handleOpenFilter={handleOpenModalFilter} allFilters={allFilters} />

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