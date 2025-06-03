import React, {  useCallback, useEffect, useMemo, useState } from 'react';

import { SectionList } from 'react-native';

import {  StyleSheet } from 'react-native';
import {  Divider, Layout,  useTheme, Text, Modal, Card, Button } from '@ui-kitten/components';

import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import { magias } from '@/assets/json/magias.json';
import SeachBar from '../components/SeachBar';
import { groupSortSpells } from '../../utils/groupMagic';
import { Spell } from '../../utils/groupMagic';
import RenderSpell from '../../utils/renderSpell';
import {RenderSectionHeader} from '../../utils/renderSpell';
import DrawerFilter from '../../utils/drawerFilter'
import {ClassIcon, SchoolIcon, RangeIcon, TempoIcon, CirculoIcon } from '../../utils/useIcons';
import { ClearFiltersButton } from '@/utils/buttons';




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

    const applyFilter = async () => {
        if (
            schoolsSelected.length === 0 &&
            selectedClasses.length === 0 &&
            selectedRange.length === 0 &&
            selectedTempo.length === 0 &&
            selectCircle.length === 0
        ) {
            alert('Nenhum filtro selecionado.');
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


// onde e tirado os parametros da URL e transformado em um objeto devo modificar somente esse:
    const parsedParams = useMemo(() => {
      return {
        escolas: params?.escolas ? JSON.parse(params.escolas as string) : [],
        classes: params?.classes ? JSON.parse(params.classes as string) : [],
        range: params?.range ? JSON.parse(params.range as string) : [],
        tempo: params?.tempo ? JSON.parse(params.tempo as string) : [],
        circle: params?.circle ? JSON.parse(params.circle as string) : []
      };
    }, [params?.escolas, params?.classes, params?.range, params?.tempo, params?.circle]);

    useEffect(() => {
      let base = magias;

      const { escolas, classes, range, tempo, circle } = parsedParams;

      if (escolas.length || classes.length || range.length || tempo.length || circle.length) {
        base = magias.filter(magia =>
          (escolas.length === 0 || escolas.includes(magia.escola)) &&
          (classes.length === 0 || magia.classes.some(classe => classes.includes(classe))) &&
          (range.length === 0 || range.includes(magia.alcance)) &&
          (tempo.length === 0 || tempo.includes(magia.tempo_de_conjuracao)) &&
          (circle.length === 0 || circle.includes(magia.circulo))
        );
      }

      setSpells(base);
    }, [parsedParams]);

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
        <Card disabled={true}>
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
          <Button onPress={() => setShowFilter(false)}>
            Fechar
          </Button>
          <ClearFiltersButton clearFilters={clearFilters} />
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
     Text:{
        paddingTop: 10,
        marginLeft: 15,
        
    },
  });