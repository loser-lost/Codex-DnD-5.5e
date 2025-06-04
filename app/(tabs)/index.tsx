import React, {  useCallback, useEffect, useMemo, useState } from 'react';

import { SectionList } from 'react-native';

import {  StyleSheet } from 'react-native';
import {  Divider, Layout,  useTheme, Text, Modal, Card, Button } from '@ui-kitten/components';

import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import { magias } from '@/assets/json/magias.json';
import SeachBar from '../../components/comp/SeachBar';
import { groupSortSpells } from '../../utils/groupMagic';
import { Spell } from '../../utils/groupMagic';
import RenderSpell from '../../components/comp/renderSpell';
import {RenderSectionHeader} from '../../components/comp/renderSpell';
import DrawerFilter from '../../components/comp/drawerFilter'
import {ClassIcon, SchoolIcon, RangeIcon, TempoIcon, CirculoIcon } from '../../utils/useIcons';
import { AppliFilterButton, ClearFiltersButton } from '@/components/comp/buttons';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';




export default function SpellsScreen() {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Spell[]>([]);
    const [spells, setSpells] = useState<Spell[]>(magias);
    const params = useLocalSearchParams();
    const router = useRouter();
    const keyExtractor = useCallback((item: Spell) => String(item.magia_id), [])
    const [showFilter, setShowFilter] = useState(false);

    const [selectCircle, setSelectCircle] = useState<string[]>([]);
    const [schoolsSelected, setSchoolsSelected] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedRange, setSelectedRange] = useState<string[]>([]);
    const [selectedTempo, setSelectedTempo] = useState<string[]>([]);

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


    const toggleCircle = useCallback((item: string) => toggleItem(item, setSelectCircle), []);
    const toggleClass = useCallback((item: string) => toggleItem(item, setSelectedClasses), []);
    const toggleSchool = useCallback((item: string) => toggleItem(item, setSchoolsSelected), []);
    const toggleRange = useCallback((item: string) => toggleItem(item, setSelectedRange), []);
    const toggleTime = useCallback((item: string) => toggleItem(item, setSelectedTempo), []);
    
    const toggleItem = (
        item: string,
        setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };
     const clearFilters = async () => {
        try {
            setSelectCircle([]);
            setSchoolsSelected([]);
            setSelectedClasses([]);
            setSelectedRange([]);
            setSelectedTempo([]);
            
        } catch (error) {
            console.error('Erro ao limpar filtros:', error);
        }
    };
    const applyFilter = () => {
      let base = magias;

      if (
        schoolsSelected.length > 0 ||
        selectedClasses.length > 0 ||
        selectedRange.length > 0 ||
        selectedTempo.length > 0 ||
        selectCircle.length > 0
      ) {
        base = magias.filter(magia =>
          (schoolsSelected.length === 0 || schoolsSelected.includes(magia.escola)) &&
          (selectedClasses.length === 0 || magia.classes.some(classe => selectedClasses.includes(classe))) &&
          (selectedRange.length === 0 || selectedRange.includes(magia.alcance)) &&
          (selectedTempo.length === 0 || selectedTempo.includes(magia.tempo_de_conjuracao)) &&
          (selectCircle.length === 0 || selectCircle.includes(magia.circulo))
        );
      }

      setSpells(base);
      setShowFilter(false); 
    };
    const totalFiltros = [
        selectCircle.length,
        schoolsSelected.length,
        selectedClasses.length,
        selectedRange.length,
        selectedTempo.length,
    ].reduce((a, b) => a + b, 0);



    useEffect(() => {
      if (searchQuery.length > 0) {
        handleSearchDebounced(searchQuery);
      }
    }, [searchQuery]);

    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
    
    const magiasAgrupadas = useMemo(() => {
      const base = searchQuery ? filteredData : spells;
      return groupSortSpells(base);
    }, [searchQuery, filteredData, spells]);

    const spellInSections = useMemo(()=>{
      return Object.entries(magiasAgrupadas).map(([circulo, data]) => ({
          title: circulo,
          data,
      }));
    }, [magiasAgrupadas]);

    const renderItem = useCallback(({ item }: { item: Spell }) => (
      <RenderSpell item={item} />
    ), []);

    
   
    const handleOpenFilter = useMemo(() => debounce(() => {
      //router.push('/filterSpell');
      setShowFilter(true); // muda o estado para mostrar o filtro modal
    }, 300), []);

    return (
      <Layout style={styles.container}>
        <SeachBar value={searchQuery} onChangeText={handleSearch} handleOpenFilter={handleOpenFilter}/>

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
              <AppliFilterButton applyFilter={applyFilter} totalFiltros={totalFiltros} />
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
      flex: 1,
      justifyContent: 'center',
    
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
  });